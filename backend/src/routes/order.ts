import { Router } from "express";
import { pool } from "../utils/db.js";
import { requireUser } from "../middleware/auth.js";
import { z } from "zod";

export const orderRouter = Router();

orderRouter.get("/", requireUser, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM orders WHERE user_id = $1",
    [req.session.userId]
  );
  res.json(result.rows);
});

const orderSchema = z.object({
  products: z.array(z.object({
    productId: z.number(),
    quantity: z.number().int().positive()
  }))
});

orderRouter.post("/", requireUser, async (req, res) => {
  const parse = orderSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error);

  const { products } = parse.data;
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Calculate total and fetch prices
    let total = 0;
    const orderItems = [];
    
    for (const item of products) {
      const result = await client.query("SELECT price FROM products WHERE id = $1", [item.productId]);
      if (!result.rows[0]) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: "Invalid product" });
      }
      const price = parseFloat(result.rows[0].price);
      total += price * item.quantity;
      orderItems.push({ productId: item.productId, quantity: item.quantity, price });
    }
    
    // Create order
    const orderResult = await client.query(
      "INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *",
      [req.session.userId, total, "pending"]
    );
    
    const orderId = orderResult.rows[0].id;
    
    // Insert order items
    for (const item of orderItems) {
      await client.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ($1, $2, $3, $4)",
        [orderId, item.productId, item.quantity, item.price]
      );
    }
    
    await client.query('COMMIT');
    res.json({ id: orderId, total, status: 'pending', products: orderItems });
  } catch (e) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: "Failed to create order" });
  } finally {
    client.release();
  }
});
import { Router } from "express";
import { pool } from "../utils/db.js";
import { requireUser } from "../middleware/auth.js";
import { z } from "zod";
export const orderRouter = Router();
orderRouter.get("/", requireUser, async (req, res) => {
    const result = await pool.query("SELECT * FROM orders WHERE user_id = $1", [req.session.userId]);
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
    if (!parse.success)
        return res.status(400).json(parse.error);
    const { products } = parse.data;
    // Calculate total (for demo, price fetched from db)
    let total = 0;
    for (const item of products) {
        const result = await pool.query("SELECT price FROM products WHERE id = $1", [item.productId]);
        if (!result.rows[0])
            return res.status(400).json({ error: "Invalid product" });
        total += result.rows[0].price * item.quantity;
    }
    const orderResult = await pool.query("INSERT INTO orders (user_id, products, total, status) VALUES ($1, $2, $3, $4) RETURNING *", [req.session.userId, JSON.stringify(products), total, "pending"]);
    res.json(orderResult.rows[0]);
});

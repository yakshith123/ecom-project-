import { Router } from "express";
import { pool } from "../utils/db.js";
import { requireAdmin } from "../middleware/auth.js";

export const analyticsRouter = Router();

// Sales and revenue for charting (past 30 days)
analyticsRouter.get("/sales", requireAdmin, async (req, res) => {
  const result = await pool.query(
    `
    SELECT
      DATE_TRUNC('day', created_at) AS day,
      SUM(total_amount) as revenue,
      COUNT(*) as orders
    FROM orders
    WHERE created_at > NOW() - INTERVAL '30 days'
    GROUP BY day
    ORDER BY day ASC
    `
  );
  res.json(result.rows);
});

// Best selling products (top 5)
analyticsRouter.get("/top-products", requireAdmin, async (req, res) => {
  const result = await pool.query(
    `
    SELECT
      p.id, p.name, SUM(oi.quantity) as sold
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    GROUP BY p.id, p.name
    ORDER BY sold DESC
    LIMIT 5
    `
  );
  res.json(result.rows);
});
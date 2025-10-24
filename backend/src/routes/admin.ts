import { Router } from "express";
import { pool } from "../utils/db.js";
import { requireAdmin } from "../middleware/auth.js";

export const adminRouter = Router();

// Get all users
adminRouter.get("/users", requireAdmin, async (_, res) => {
  const result = await pool.query(
    "SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

// Update user role
adminRouter.put("/user/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  await pool.query("UPDATE users SET role = $1 WHERE id = $2", [role, id]);
  res.json({ success: true });
});

// Delete user
adminRouter.delete("/user/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
  res.json({ success: true });
});

adminRouter.get("/orders", requireAdmin, async (_, res) => {
  const result = await pool.query("SELECT * FROM orders");
  res.json(result.rows);
});

adminRouter.put("/order/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [status, id]);
  res.json({ success: true });
});
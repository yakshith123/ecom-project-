import { Router } from "express";
import { pool } from "../utils/db.js";
import { requireAdmin } from "../middleware/auth.js";
export const adminRouter = Router();
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

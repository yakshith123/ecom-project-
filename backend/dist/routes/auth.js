import { Router } from "express";
import { pool } from "../utils/db.js";
import { z } from "zod";
import { hashPassword, verifyPassword } from "../utils/fake-auth.js";
export const authRouter = Router();
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1)
});
authRouter.post("/register", async (req, res) => {
    const parse = registerSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json(parse.error);
    const { email, password, name } = parse.data;
    const hashed = await hashPassword(password);
    try {
        const result = await pool.query("INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, is_admin", [email, hashed, name]);
        req.session.userId = result.rows[0].id;
        req.session.isAdmin = result.rows[0].is_admin;
        res.json(result.rows[0]);
    }
    catch (e) {
        res.status(500).json({ error: "User exists or DB error" });
    }
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});
authRouter.post("/login", async (req, res) => {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json(parse.error);
    const { email, password } = parse.data;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user)
        return res.status(401).json({ error: "Invalid credentials" });
    const valid = await verifyPassword(password, user.password);
    if (!valid)
        return res.status(401).json({ error: "Invalid credentials" });
    req.session.userId = user.id;
    req.session.isAdmin = user.is_admin;
    res.json({ id: user.id, email: user.email, name: user.name, isAdmin: user.is_admin });
});
authRouter.post("/logout", (req, res) => {
    req.session.destroy(() => res.json({ message: "Logged out" }));
});

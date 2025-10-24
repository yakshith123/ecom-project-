import { Router, Request, Response } from "express";
import { pool } from "../utils/db.js";
import { z } from "zod";
import { hashPassword, verifyPassword } from "../utils/fake-auth.js";

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1)
});

authRouter.post("/register", async (req: Request, res: Response) => {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error);

  const { email, password, name } = parse.data;
  const hashed = await hashPassword(password);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, role",
      [email, hashed, name]
    );
    req.session.userId = result.rows[0].id;
    req.session.isAdmin = result.rows[0].role === 'admin';
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: "User exists or DB error" });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error);

  const { email, password } = parse.data;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  req.session.userId = user.id;
  req.session.isAdmin = user.role === 'admin';
  res.json({ id: user.id, email: user.email, name: user.name, isAdmin: user.role === 'admin' });
});

authRouter.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ message: "Logged out" }));
});

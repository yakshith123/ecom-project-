import { Router } from "express";
import { pool } from "../utils/db.js";
import { z } from "zod";
import { requireAdmin } from "../middleware/auth.js";
export const productRouter = Router();
const productSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().positive(),
    image: z.string().url().optional(), // optional for multi-image
    images: z.array(z.string().url()).optional(),
    stock: z.number().int().nonnegative()
});
productRouter.get("/", async (_, res) => {
    const result = await pool.query("SELECT *, COALESCE(images, ARRAY[image]) as images FROM products");
    res.json(result.rows);
});
productRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const result = await pool.query("SELECT *, COALESCE(images, ARRAY[image]) as images FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0)
        return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
});
productRouter.post("/", requireAdmin, async (req, res) => {
    const parse = productSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json(parse.error);
    const { name, description, price, image, images, stock } = parse.data;
    // Prefer images, fallback to [image]
    const imagesArr = images && images.length > 0 ? images : image ? [image] : [];
    const result = await pool.query("INSERT INTO products (name, description, price, image, images, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [name, description, price, image || "", imagesArr, stock]);
    res.json(result.rows[0]);
});
productRouter.put("/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    const parse = productSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json(parse.error);
    const { name, description, price, image, images, stock } = parse.data;
    const imagesArr = images && images.length > 0 ? images : image ? [image] : [];
    const result = await pool.query("UPDATE products SET name=$1, description=$2, price=$3, image=$4, images=$5, stock=$6 WHERE id=$7 RETURNING *", [name, description, price, image || "", imagesArr, stock, id]);
    res.json(result.rows[0]);
});

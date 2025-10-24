import express from "express";
import cors from "cors";
import session from "express-session";
import { analyticsRouter } from "./routes/analytics.js";
import { authRouter } from "./routes/auth.js";
import { productRouter } from "./routes/product.js";
import { orderRouter } from "./routes/order.js";
import { adminRouter } from "./routes/admin.js";
import { paymentRouter } from "./routes/payment.js";

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true
}));
app.use(express.json());

app.use(
	session({
		secret: process.env.SESSION_SECRET || "dev-secret",
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false }
	})
);

app.use("/api/analytics", analyticsRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/payment", paymentRouter);

export default app;
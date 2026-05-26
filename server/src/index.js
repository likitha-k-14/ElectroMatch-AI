import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDb } from "./db.js";
import { setDbEnabled } from "./store.js";
import productsRouter from "./routes/products.js";
import recommendationsRouter from "./routes/recommendations.js";
import comparisonsRouter from "./routes/comparisons.js";
import filtersRouter from "./routes/filters.js";
import preferencesRouter from "./routes/preferences.js";
import wishlistRouter from "./routes/wishlist.js";
import historyRouter from "./routes/history.js";
import chatRouter from "./routes/chat.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({
    name: "ElectroMatch AI API",
    status: "running",
    health: "/api/health",
    products: "/api/products"
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, name: "ElectroMatch AI API" });
});

app.use("/api/products", productsRouter);
app.use("/api/recommendations", recommendationsRouter);
app.use("/api/comparisons", comparisonsRouter);
app.use("/api/filters", filtersRouter);
app.use("/api/preferences", preferencesRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/history", historyRouter);
app.use("/api/chat", chatRouter);
app.use("/api/auth", authRouter);

const dbEnabled = await connectDb(process.env.MONGODB_URI);
setDbEnabled(dbEnabled);

app.listen(port, () => {
  console.log(`ElectroMatch AI API running on http://localhost:${port}`);
});

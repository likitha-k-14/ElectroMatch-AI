import { Router } from "express";
import { getProductById, getProducts } from "../store.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await getProducts(req.query);
  res.json({ products });
});

router.get("/:id", async (req, res) => {
  const product = await getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
});

export default router;

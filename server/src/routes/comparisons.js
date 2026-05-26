import { Router } from "express";
import { getProductById } from "../store.js";

const router = Router();

router.post("/", async (req, res) => {
  const ids = req.body.ids || [];
  const products = (await Promise.all(ids.map((id) => getProductById(id)))).filter(Boolean);
  const rows = ["ram", "storage", "processor", "battery", "display", "weight", "camera", "gpu", "performanceScore"].map((key) => ({
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase()),
    values: products.map((product) => product.specs[key] ?? "N/A")
  }));

  res.json({ products, rows });
});

export default router;

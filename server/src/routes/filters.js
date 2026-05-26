import { Router } from "express";
import { getProducts } from "../store.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await getProducts(req.query);
  const brands = [...new Set(products.map((product) => product.brand))];
  const categories = [...new Set(products.map((product) => product.category))];
  const operatingSystems = [...new Set(products.map((product) => product.os))];

  res.json({
    products,
    facets: {
      brands,
      categories,
      operatingSystems,
      tags: ["gaming", "student", "best battery", "lightweight", "best camera", "best performance"]
    }
  });
});

export default router;

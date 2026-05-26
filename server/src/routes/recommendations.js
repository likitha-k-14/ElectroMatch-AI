import { Router } from "express";
import { getProducts, savePreference, saveRecommendation } from "../store.js";
import { recommendProducts } from "../services/recommendationEngine.js";

const router = Router();

router.post("/", async (req, res) => {
  const preferences = req.body || {};
  const products = await getProducts();
  const recommendations = recommendProducts(products, preferences).slice(0, 6);

  await savePreference(preferences);
  await saveRecommendation({ preferences, products: recommendations });

  res.json({ preferences, recommendations });
});

export default router;

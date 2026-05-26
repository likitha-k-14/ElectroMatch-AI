import { Router } from "express";
import { getProductById, getWishlistIds, toggleWishlist } from "../store.js";

const router = Router();

router.get("/", async (_req, res) => {
  const products = (await Promise.all(getWishlistIds().map((id) => getProductById(id)))).filter(Boolean);
  res.json({ products, ids: getWishlistIds() });
});

router.post("/:id", (req, res) => {
  const ids = toggleWishlist(req.params.id);
  res.json({ ids });
});

export default router;

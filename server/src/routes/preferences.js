import { Router } from "express";
import { savePreference } from "../store.js";

const router = Router();

router.post("/", async (req, res) => {
  const preference = await savePreference(req.body || {});
  res.status(201).json({ preference });
});

export default router;

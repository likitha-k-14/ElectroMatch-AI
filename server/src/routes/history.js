import { Router } from "express";
import { getHistory } from "../store.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ history: getHistory() });
});

export default router;

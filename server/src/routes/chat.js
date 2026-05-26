import { Router } from "express";
import { getProducts } from "../store.js";
import { answerAssistantQuestion } from "../services/recommendationEngine.js";

const router = Router();

router.post("/", async (req, res) => {
  const products = await getProducts();
  const answer = answerAssistantQuestion(req.body.message || "", products);
  res.json({ answer });
});

export default router;

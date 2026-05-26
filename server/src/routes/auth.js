import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

const router = Router();
const users = [];

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
  if (users.some((user) => user.email === email)) return res.status(409).json({ message: "Email already registered" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: randomUUID(), name, email, passwordHash };
  users.push(user);
  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
  res.status(201).json({ token, user: { id: user.id, name, email } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, name: user.name, email } });
});

export default router;

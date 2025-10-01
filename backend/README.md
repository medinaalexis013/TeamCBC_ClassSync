import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../db/mock.js";

const router = express.Router();

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
}

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { email, name, password } = req.body || {};
  if (!email || !password || !name) return res.status(400).json({ error: "Missing fields" });
  if (!/@csulb\.edu$/.test(email)) return res.status(400).json({ error: "Use your CSULB email" });

  const exists = db.users.find(u => u.email === email);
  if (exists) return res.status(409).json({ error: "Account already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = { id: `u${Date.now()}`, email, name, passwordHash, verified: false };
  db.users.push(newUser);

  // TODO: send verification email with token
  return res.status(201).json({ message: "Signup successful. Please verify your email." });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  if (!user.verified) return res.status(403).json({ error: "Please verify your email" });

  const token = signToken(user);
  return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// POST /api/auth/forgot
router.post("/forgot", (req, res) => {
  const { email } = req.body || {};
  const user = db.users.find(u => u.email === email);
  if (!user) return res.json({ message: "If that email exists, reset instructions were sent." });
  // TODO: issue reset token + send email
  return res.json({ message: "Password reset email sent (stubbed)." });
});

// POST /api/auth/reset
router.post("/reset", (req, res) => {
  // TODO: validate token + update password
  return res.json({ message: "Password updated (stubbed)." });
});

export default router;

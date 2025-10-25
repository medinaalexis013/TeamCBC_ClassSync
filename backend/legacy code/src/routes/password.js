import express from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendPasswordResetEmail } from "../services/mailer";
import { saveResetToken, useResetToken, peekToken } from "../services/tokenStore.js";
import db from "../db/mock.js";

const router = express.Router();

function strongPassword(pw) {
    return typeof pw === "string" && pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);
}

// [X]  <- login page includes forgot password
// POST /api/password/forgot

router.post("/forgot", async (req, res) => {
    const {email} = req.body || {};
    const user = db.users.find(u => u.email === (email || "").toLowerCase())

    if (!user) return res.json({message: "If that email is registered, a password reset link has been sent."});

    const token = crypto.randomBytes(32).toString("hex");
    saveResetToken(token, user.id, 30); // 30 minutes TTL

    const resetLink = `need frontend link + DB route`;
    await sendPasswordResetEmail(user.email, resetLink);


    return res.json({message: "If that email is registered, a password reset link has been sent."});
});

router.get("/reset/peek", (req, res) => {
    const {token} = req.query || {};
    if (!token) return res.status(400).json({error: "missing token"});

    const result = peekToken(token);
    if (!result.ok) return res.status(400).json({error: result.reason}); //[X]

    return res.json({ ok: true});
});
router.post("/reset", async (req, res) => {
    const {token, password, confirm } = req.body || {};
    if (!token) return res.status(400).json({error: "missing token"});
    if (!password || !confirm) return res.status(400).json({error: "missing fields"});
    if (password !== confirm) return res.status(400).json({error: "passwords do not match"});
    if (!strongPassword(password)) return res.status(400).json({error: "password is not strong enough"});

    const used = useResetToken(token);
    if (!used.ok) return res.status(400).json({error: used.reason}); //[X]

    const user = db.users.find(u => u.id === used.userId);
    if (!user) return res.status(400).json({error: "user not found"});
    user.passwordHash = await bcrypt.hash(password, 12);

    return res.json({message: "password has been reset"});
});

export default router;
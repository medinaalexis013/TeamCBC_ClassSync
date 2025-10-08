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
    const sendPasswordResetEmail(user.email, resetLink).catch(console.error);

    return res.json({message: "If that email is registered, a password reset link has been sent."});
});
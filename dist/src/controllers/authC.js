import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../services/authS.js";
import { generateToken, verifyToken } from "../utils/authU.js";
const prisma = new PrismaClient();
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body || {};
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashed = await hashPassword(password);
        const user = await prisma.user.create({
            data: { username, email, password: hashed },
        });
        const token = generateToken(user.id);
        res.status(201).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const valid = await comparePassword(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user.id);
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
export const profile = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    }
    catch (err) {
        console.error("Profile error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

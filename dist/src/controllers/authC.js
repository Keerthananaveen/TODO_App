import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../services/authS.js";
import { generateToken, verifyToken } from "../utils/authU.js";
const prisma = new PrismaClient();
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: "Email already exists" });
        const hashed = await hashPassword(password);
        const user = await prisma.user.create({
            data: { name, email, password: hashed },
        });
        const token = generateToken(user.id);
        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const valid = await comparePassword(password, user.password);
        if (!valid)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
export const profile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ id: user.id, name: user.name, email: user.email });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

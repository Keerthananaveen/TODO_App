import { Token } from "acorn";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const verifyToken = (Token) => {
    return jwt.verify(Token, JWT_SECRET);
};
export const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
};

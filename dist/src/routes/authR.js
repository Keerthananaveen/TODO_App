import { Router } from "express";
import { signup, login, profile } from "../controllers/authC.js";
import { authenticate } from "../middleware/authM.js";
const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticate, profile);
export default router;

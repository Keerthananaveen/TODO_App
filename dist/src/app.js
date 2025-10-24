import express from "express";
import authRoutes from "./routes/authR.js";
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
import { errorHandler } from "./middleware/error.js";
app.use(errorHandler);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
export default app;

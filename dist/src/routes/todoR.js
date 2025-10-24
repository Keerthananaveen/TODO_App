import express from "express";
import * as TodoController from "../controllers/todoC.js";
const router = express.Router();
router.get("/", TodoController.getTodos);
router.get("/:id", TodoController.getTodoById);
router.post("/", TodoController.createTodo);
router.put("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.deleteTodo);
export default router;

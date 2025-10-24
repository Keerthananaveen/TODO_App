// // import { PrismaClient } from "@prisma/client";
// import type { AuthRequest } from "../middlewares/authM";
// // const prisma = new PrismaClient();
// import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynch.js";
import * as TodoService from "../services/todoS.js";
export const getTodos = asyncHandler(async (req, res) => {
    const todos = await TodoService.getTodos(req.user.id);
    res.json(todos);
});
export const getTodoById = asyncHandler(async (req, res) => {
    const todo = await TodoService.getTodoById(req.user.id, Number(req.params.id));
    if (!todo)
        return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
});
export const createTodo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const todo = await TodoService.createTodo(req.user.id, title, description);
    res.status(201).json(todo);
});
export const updateTodo = asyncHandler(async (req, res) => {
    const todo = await TodoService.updateTodo(req.user.id, Number(req.params.id), req.body);
    res.json(todo);
});
export const deleteTodo = asyncHandler(async (req, res) => {
    await TodoService.deleteTodo(req.user.id, Number(req.params.id));
    res.json({ message: "Todo deleted" });
});

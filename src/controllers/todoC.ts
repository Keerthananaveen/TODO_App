import type { Response } from "express";
import type { AuthRequest } from "../middleware/authM.js";
import { asyncHandler } from "../utils/asynch.js";
import * as TodoService from "../services/todoS.js";
import { Status } from "@prisma/client";

export const getTodos = asyncHandler(async (req: AuthRequest, res: Response) => {
  const todos = await TodoService.getTodos(req.userId!);
  res.json(todos);
});

export const getTodoById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const todoId = req.params.id;

  const todo = await TodoService.getTodoById(req.userId!, todoId);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found." });
  }

  if (todo.deleted || todo.deletedAt) {
    return res.status(400).json({ message: "This todo was already deleted." });
  }

  res.json(todo);
});

export const createTodo = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { title, description, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({ message: "Title and status are required." });
  }

  if (!Object.values(Status).includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  const todo = await TodoService.createTodo(req.userId!, title, description, status);
  res.status(201).json(todo);
});

export const updateTodo = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { title, description, status } = req.body;
  const todoId = req.params.id;

  if (!Object.values(Status).includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  const existingTodo = await TodoService.getTodoById(req.userId!, todoId);
  if (!existingTodo) {
    return res.status(404).json({ message: "Todo not found." });
  }

  if (existingTodo.deleted || existingTodo.deletedAt) {
    return res.status(400).json({ message: "This todo was already deleted." });
  }

  const todo = await TodoService.updateTodo(req.userId!, todoId, { title, description, status });
  res.json(todo);
});

export const deleteTodo = asyncHandler(async (req: AuthRequest, res: Response) => {
  const todoId = req.params.id;

  const existingTodo = await TodoService.getTodoById(req.userId!, todoId);
  if (!existingTodo) {
    return res.status(404).json({ message: "Todo not found." });
  }

  if (existingTodo.deleted || existingTodo.deletedAt) {
    return res.status(400).json({ message: "This todo was already deleted." });
  }

  await TodoService.deleteTodo(req.userId!, todoId);

  res.json({ message: "Todo deleted successfully." });
});

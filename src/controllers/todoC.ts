import type { Response } from "express";
import type { AuthRequest } from "../middleware/authM.js";
import { asyncHandler } from "../utils/asynch.js";
import * as TodoService from "../services/todoS.js";

export const getTodos = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const todos = await TodoService.getTodos(req.userId!);
    res.json(todos);
  }
);

export const getTodoById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const todo = await TodoService.getTodoById(req.userId!, req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  }
);

export const createTodo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { title, description, status } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    
    const todo = await TodoService.createTodo(
      req.userId!,
      title,
      description,
      status
    );
    res.status(201).json(todo);
  }
);

export const updateTodo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { title, description, status } = req.body;
    

    const existingTodo = await TodoService.getTodoById(req.userId!, req.params.id);
    if (!existingTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    const todo = await TodoService.updateTodo(req.userId!, req.params.id, {
      title,
      description,
      status,
    });
    res.json(todo);
  }
);

export const deleteTodo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
  
    const existingTodo = await TodoService.getTodoById(req.userId!, req.params.id);
    if (!existingTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    await TodoService.deleteTodo(req.userId!, req.params.id);
    res.json({ message: "Todo deleted successfully" });
  }
);
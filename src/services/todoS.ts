import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export const getTodos = async (userId: number) => {
  return prisma.todo.findMany({ 
    where: { userId }  
  });
};

export const getTodoById = async (userId: number, id: string) => {  
  return prisma.todo.findFirst({ 
    where: { 
      userId,  
      id  
    } 
  });
};

export const createTodo = async (
  userId: number,
  title: string,
  description?: string,
  status: Status = "PENDING"
) => {
  return prisma.todo.create({ 
    data: { 
      title, 
      description, 
      status, 
      userId  
    } 
  });
};

export const updateTodo = async (
  userId: number,
  id: string, 
  data: { title?: string; description?: string; status?: Status }
) => {
  return prisma.todo.update({
    where: { id }, 
    data,
  });
};

export const deleteTodo = async (userId: number, id: string) => {  
  return prisma.todo.update({
    where: {
      id,
      userId, 
    },
    data: {
      deleted: true,
      deletedAt: new Date(),
    },
  });
};

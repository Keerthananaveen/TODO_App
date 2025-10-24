import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getTodos = async (userId) => {
    return prisma.todo.findMany({ where: { userId } });
};
export const getTodoById = async (userId, id) => {
    return prisma.todo.findFirst({ where: { id, userId } });
};
export const createTodo = async (userId, title, description) => {
    return prisma.todo.create({ data: { title, description, userId } });
};
export const updateTodo = async (userId, id, data) => {
    return prisma.todo.updateMany({ where: { id, userId }, data });
};
export const deleteTodo = async (userId, id) => {
    return prisma.todo.deleteMany({ where: { id, userId } });
};

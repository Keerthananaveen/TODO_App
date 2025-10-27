import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getTodos = async (userId) => {
    return prisma.todo.findMany({
        where: { userId }
    });
};
export const getTodoById = async (userId, id) => {
    return prisma.todo.findFirst({
        where: {
            userId,
            id
        }
    });
};
export const createTodo = async (userId, title, description, status = "PENDING") => {
    return prisma.todo.create({
        data: {
            title,
            description,
            status,
            userId
        }
    });
};
export const updateTodo = async (userId, id, data) => {
    return prisma.todo.update({
        where: { id },
        data,
    });
};
export const deleteTodo = async (userId, id) => {
    return prisma.todo.delete({
        where: { id },
    });
};

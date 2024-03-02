"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const prisma_1 = require("../database/prisma");
const AppError_1 = require("../errors/AppError");
const task_schema_1 = require("../schemas/task.schema");
class TaskService {
    create = async (payload, userId) => {
        const newTask = await prisma_1.prisma.task.create({ data: { ...payload, userId } });
        return task_schema_1.taskSchema.parse(newTask);
    };
    read = async (userId, category) => {
        let query = { include: { category: true }, where: { userId } };
        if (category) {
            const whereField = { name: { equals: category, mode: "insensitive" } };
            query = { ...query, where: { ...query.where, category: whereField } };
        }
        const allTasks = await prisma_1.prisma.task.findMany(query);
        if (!allTasks.length) {
            throw new AppError_1.AppError("There are no tasks", 404);
        }
        return task_schema_1.readTaskSchema.array().parse(allTasks);
    };
    readById = async (id) => {
        const task = await prisma_1.prisma.task.findFirst({ include: { category: true }, where: { id: Number(id) } });
        return task_schema_1.taskSchema.parse(task);
    };
    update = async (id, payload) => {
        const updatedTask = await prisma_1.prisma.task.update({ where: { id: Number(id) }, data: payload });
        return task_schema_1.taskSchema.parse(updatedTask);
    };
    delete = async (id) => {
        await prisma_1.prisma.task.delete({ where: { id: Number(id) } });
    };
}
exports.TaskService = TaskService;

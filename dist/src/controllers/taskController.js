"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const taskService_1 = require("../services/taskService");
class TaskController {
    taskService = new taskService_1.TaskService();
    create = async (req, res) => {
        const userId = Number(res.locals.decoded.sub);
        const newTask = await this.taskService.create(req.body, userId);
        return res.status(201).json(newTask);
    };
    read = async ({ query }, res) => {
        const userId = Number(res.locals.decoded.sub);
        const category = query.category ? String(query.category) : undefined;
        const allTasks = await this.taskService.read(userId, category);
        return res.status(200).json(allTasks);
    };
    readById = async ({ params: { id } }, res) => {
        const task = await this.taskService.readById(id);
        return res.status(200).json(task);
    };
    update = async (req, res) => {
        const updatedTask = await this.taskService.update(req.params.id, req.body);
        return res.status(200).json(updatedTask);
    };
    delete = async (req, res) => {
        await this.taskService.delete(req.params.id);
        return res.status(204).json();
    };
}
exports.TaskController = TaskController;

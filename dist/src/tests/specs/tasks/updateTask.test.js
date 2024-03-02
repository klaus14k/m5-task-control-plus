"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const prisma_1 = require("../../../database/prisma");
const category_mocks_1 = require("../../mocks/category.mocks");
const tasks_mocks_1 = require("../../mocks/tasks.mocks");
const user_mocks_1 = require("../../mocks/user.mocks");
const setupFiles_1 = require("../../setupFiles");
const generateAuthentication_1 = require("../../utils/generateAuthentication");
const taskDefaultExpects_1 = require("../../utils/taskDefaultExpects");
const updateTaskBeforeEach = async () => {
    const { user: user1, token: token1 } = await (0, generateAuthentication_1.generateAuthentication)();
    await prisma_1.prisma.category.create({ data: (0, category_mocks_1.category)(user1.id) });
    const taskList = await (0, tasks_mocks_1.getTaskList)(user1.id);
    await prisma_1.prisma.task.createMany({ data: taskList });
    const { token: token2 } = await (0, generateAuthentication_1.generateAuthentication)(user_mocks_1.secondUserMock);
    return { user: user1, token: token1, secondToken: token2 };
};
(0, vitest_1.describe)("update task", () => {
    (0, vitest_1.it)("should be able to update task successfully ", async () => {
        const { user, token } = await updateTaskBeforeEach();
        const task = await prisma_1.prisma.task.findFirst();
        const data = await setupFiles_1.request
            .patch(`/tasks/${task?.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(tasks_mocks_1.updateTask)
            .expect(200)
            .then((response) => response.body);
        (0, taskDefaultExpects_1.taskDefaultExpects)(data, user.id);
        (0, vitest_1.expect)(data.title).toBe(tasks_mocks_1.updateTask.title);
        (0, vitest_1.expect)(data.content).toBe(tasks_mocks_1.updateTask.content);
        (0, vitest_1.expect)(data.finished).toBe(tasks_mocks_1.updateTask.finished);
    });
    (0, vitest_1.it)("should throw error when try to update a invalid task", async () => {
        const { token } = await updateTaskBeforeEach();
        const tasks = await prisma_1.prisma.task.findMany();
        const id = tasks[1].id + 1;
        await setupFiles_1.request
            .patch(`/tasks/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(404)
            .then((response) => response.body);
    });
    (0, vitest_1.it)("should throw error when try to update a task with invalid data types", async () => {
        const { token } = await updateTaskBeforeEach();
        const task = await prisma_1.prisma.task.findFirst();
        await setupFiles_1.request
            .patch(`/tasks/${task?.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(tasks_mocks_1.invalidDataUpdateTask)
            .expect(400);
    });
    (0, vitest_1.it)("should throw error when try update a task from a different user", async () => {
        const { secondToken } = await updateTaskBeforeEach();
        const task = await prisma_1.prisma.task.findFirst();
        await setupFiles_1.request
            .patch(`/tasks/${task?.id}`)
            .set("Authorization", `Bearer ${secondToken}`)
            .send(tasks_mocks_1.updateTask)
            .expect(403);
    });
    (0, vitest_1.it)("should throw error when there is no token", async () => {
        await setupFiles_1.request.patch("/tasks/1").expect(401);
    });
    (0, vitest_1.it)("should throw error when the token is invalid", async () => {
        const token = (0, generateAuthentication_1.generateInvalidToken)();
        await setupFiles_1.request
            .patch("/tasks/1")
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    });
});

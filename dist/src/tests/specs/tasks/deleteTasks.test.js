"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const prisma_1 = require("../../../database/prisma");
const tasks_mocks_1 = require("../../mocks/tasks.mocks");
const user_mocks_1 = require("../../mocks/user.mocks");
const setupFiles_1 = require("../../setupFiles");
const generateAuthentication_1 = require("../../utils/generateAuthentication");
const deleteTaskBeforeEach = async () => {
    const { user: user1, token: token1 } = await (0, generateAuthentication_1.generateAuthentication)();
    const deleteTask = await prisma_1.prisma.task.create({
        data: { ...tasks_mocks_1.task, userId: user1.id },
    });
    const { token: token2 } = await (0, generateAuthentication_1.generateAuthentication)(user_mocks_1.secondUserMock);
    return { token: token1, secondToken: token2, deleteTask };
};
(0, vitest_1.describe)("delete task", () => {
    (0, vitest_1.it)("should be able to delete task sucessfully", async () => {
        const { token, deleteTask } = await deleteTaskBeforeEach();
        await setupFiles_1.request
            .delete(`/tasks/${deleteTask?.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204);
    });
    (0, vitest_1.it)("should throw error when try to delete a invalid task", async () => {
        const { token, deleteTask } = await deleteTaskBeforeEach();
        const id = deleteTask?.id + 1;
        await setupFiles_1.request
            .delete(`/tasks/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(404);
    });
    (0, vitest_1.it)("should throw error when try to delete a task from a different user", async () => {
        const { secondToken, deleteTask } = await deleteTaskBeforeEach();
        await setupFiles_1.request
            .delete(`/tasks/${deleteTask?.id}`)
            .set("Authorization", `Bearer ${secondToken}`)
            .expect(403);
    });
    (0, vitest_1.it)("should throw error when there is no token", async () => {
        await setupFiles_1.request.delete("/tasks/1").expect(401);
    });
    (0, vitest_1.it)("should throw error when the token is invalid", async () => {
        const token = (0, generateAuthentication_1.generateInvalidToken)();
        await setupFiles_1.request
            .delete("/tasks/1")
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    });
});

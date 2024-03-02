"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const tasks_mocks_1 = require("../../mocks/tasks.mocks");
const setupFiles_1 = require("../../setupFiles");
const generateAuthentication_1 = require("../../utils/generateAuthentication");
const taskDefaultExpects_1 = require("../../utils/taskDefaultExpects");
(0, vitest_1.describe)("create task", () => {
    (0, vitest_1.it)("should be able to create task sucessfully", async () => {
        const { user, token } = await (0, generateAuthentication_1.generateAuthentication)();
        const data = await setupFiles_1.request
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(tasks_mocks_1.task)
            .expect(201)
            .then((response) => response.body);
        (0, taskDefaultExpects_1.taskDefaultExpects)(data, user.id);
    });
    (0, vitest_1.it)("should throw error when try to create a task in a invalid category", async () => {
        const { token } = await (0, generateAuthentication_1.generateAuthentication)();
        await setupFiles_1.request
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(tasks_mocks_1.taskWithInvalidCategory)
            .expect(404);
    });
    (0, vitest_1.it)("should throw error when try to create a task with a missing body parameter", async () => {
        const { token } = await (0, generateAuthentication_1.generateAuthentication)();
        await setupFiles_1.request
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .expect(400);
    });
    (0, vitest_1.it)("should throw error when try to create a task with invalid data types", async () => {
        const { token } = await (0, generateAuthentication_1.generateAuthentication)();
        await setupFiles_1.request
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(tasks_mocks_1.invalidDataTask)
            .expect(400);
    });
    (0, vitest_1.it)("should throw error when there is no token", async () => {
        await setupFiles_1.request.post("/tasks").expect(401);
    });
    (0, vitest_1.it)("should throw error when the token is invalid", async () => {
        const token = (0, generateAuthentication_1.generateInvalidToken)();
        await setupFiles_1.request
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const category_mocks_1 = require("../../mocks/category.mocks");
const setupFiles_1 = require("../../setupFiles");
const generateAuthentication_1 = require("../../utils/generateAuthentication");
(0, vitest_1.describe)("create category", async () => {
    (0, vitest_1.it)("should be able to create category successfully", async () => {
        const { user, token } = await (0, generateAuthentication_1.generateAuthentication)();
        const data = await setupFiles_1.request
            .post("/categories")
            .set("Authorization", `Bearer ${token}`)
            .send((0, category_mocks_1.category)(user.id))
            .expect(201)
            .then((response) => response.body);
        (0, vitest_1.expect)(data).toBeDefined();
        (0, vitest_1.expect)(data).toBeTypeOf("object");
        (0, vitest_1.expect)(data.id).toBeDefined();
        (0, vitest_1.expect)(data.id).toBeTypeOf("number");
        (0, vitest_1.expect)(data.name).toBeDefined();
        (0, vitest_1.expect)(data.name).toBeTypeOf("string");
        (0, vitest_1.expect)(data.userId).toBeDefined();
        (0, vitest_1.expect)(data.userId).toBeTypeOf("number");
    });
    (0, vitest_1.it)("should throw error when try to create a task with a missing body parameter", async () => {
        const { token } = await (0, generateAuthentication_1.generateAuthentication)();
        await setupFiles_1.request
            .post("/categories")
            .set("Authorization", `Bearer ${token}`)
            .expect(400);
    });
    (0, vitest_1.it)("should throw error when try to create a task with invalid data types", async () => {
        const { token } = await (0, generateAuthentication_1.generateAuthentication)();
        await setupFiles_1.request
            .post("/categories")
            .set("Authorization", `Bearer ${token}`)
            .send(category_mocks_1.invalidDataCategory)
            .expect(400);
    });
    (0, vitest_1.it)("should throw error when there is no token", async () => {
        await setupFiles_1.request.post("/categories").expect(401);
    });
    (0, vitest_1.it)("should throw error when the token is invalid", async () => {
        const token = (0, generateAuthentication_1.generateInvalidToken)();
        await setupFiles_1.request
            .post("/categories")
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    });
});

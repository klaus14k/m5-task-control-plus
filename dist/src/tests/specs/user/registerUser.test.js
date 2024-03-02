"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const prisma_1 = require("../../../database/prisma");
const user_mocks_1 = require("../../mocks/user.mocks");
const setupFiles_1 = require("../../setupFiles");
const userDefaultExpects_1 = require("../../utils/userDefaultExpects");
(0, vitest_1.describe)("register user", () => {
    (0, vitest_1.it)("should be able to register a user sucessfully", async () => {
        const data = await setupFiles_1.request
            .post("/users")
            .send(user_mocks_1.userMock)
            .expect(201)
            .then((response) => response.body);
        (0, userDefaultExpects_1.userDefaultExpects)(data);
        (0, vitest_1.expect)(data.password).toBeUndefined();
    });
    (0, vitest_1.it)("should not be able to register a user with the same email", async () => {
        await prisma_1.prisma.user.create({ data: user_mocks_1.userMock });
        await setupFiles_1.request.post("/users").send(user_mocks_1.userMock).expect(409);
    });
    (0, vitest_1.it)("should throw error when try to register a user with a missing body parameter", async () => {
        await setupFiles_1.request.post("/users").expect(400);
    });
    (0, vitest_1.it)("should throw error when try to register a user with invalid data types", async () => {
        await setupFiles_1.request.post("/users").send(user_mocks_1.invalidDataUserMock).expect(400);
    });
});

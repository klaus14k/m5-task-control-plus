"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const vitest_1 = require("vitest");
const prisma_1 = require("../../../database/prisma");
const user_mocks_1 = require("../../mocks/user.mocks");
const setupFiles_1 = require("../../setupFiles");
const userDefaultExpects_1 = require("../../utils/userDefaultExpects");
const loginUserBeforeEach = async () => {
    const password = await (0, bcryptjs_1.hash)(user_mocks_1.userMock.password, 10);
    const registerUser = await prisma_1.prisma.user.create({
        data: { ...user_mocks_1.userMock, password },
    });
    return { registerUser };
};
(0, vitest_1.describe)("login user", () => {
    (0, vitest_1.it)("should be able de login correctly", async () => {
        const { registerUser } = await loginUserBeforeEach();
        const credentials = {
            email: registerUser.email,
            password: "1234",
        };
        const data = await setupFiles_1.request
            .post("/users/login")
            .send(credentials)
            .expect(200)
            .then((response) => response.body);
        (0, vitest_1.expect)(data).toBeDefined();
        (0, vitest_1.expect)(data).toBeTypeOf("object");
        (0, vitest_1.expect)(data.accessToken).toBeDefined();
        (0, vitest_1.expect)(data.accessToken).toBeTypeOf("string");
        (0, userDefaultExpects_1.userDefaultExpects)(data.user);
    });
    (0, vitest_1.it)("should be throw error when password in wrong", async () => {
        const { registerUser } = await loginUserBeforeEach();
        const credentials = {
            email: registerUser.email,
            password: "wrongpassword",
        };
        await setupFiles_1.request.post("/users/login").send(credentials).expect(401);
    });
    (0, vitest_1.it)("should be throw error when user not found", async () => {
        const credentials = {
            email: "invalid@email.com",
            password: "wrongpassword",
        };
        await setupFiles_1.request.post("/users/login").send(credentials).expect(404);
    });
});

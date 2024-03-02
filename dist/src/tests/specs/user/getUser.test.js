"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const setupFiles_1 = require("../../setupFiles");
const generateAuthentication_1 = require("../../utils/generateAuthentication");
const userDefaultExpects_1 = require("../../utils/userDefaultExpects");
(0, vitest_1.describe)("get user", () => {
    (0, vitest_1.it)("should be able to get user sucessfully", async () => {
        const { token } = await (0, generateAuthentication_1.generateAuthentication)();
        const data = await setupFiles_1.request
            .get("/users/profile")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .then((response) => response.body);
        (0, userDefaultExpects_1.userDefaultExpects)(data);
    });
    (0, vitest_1.it)("should throw error when there is no token", async () => {
        await setupFiles_1.request.get("/users/profile").expect(401);
    });
    (0, vitest_1.it)("should throw error when the token is invalid", async () => {
        const token = (0, generateAuthentication_1.generateInvalidToken)();
        await setupFiles_1.request
            .get("/users/profile")
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    });
});

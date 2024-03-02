"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDefaultExpects = void 0;
const vitest_1 = require("vitest");
const userDefaultExpects = (user) => {
    (0, vitest_1.expect)(user).toBeDefined();
    (0, vitest_1.expect)(user).toBeTypeOf("object");
    (0, vitest_1.expect)(user.id).toBeDefined();
    (0, vitest_1.expect)(user.id).toBeTypeOf("number");
    (0, vitest_1.expect)(user.name).toBeDefined();
    (0, vitest_1.expect)(user.name).toBeTypeOf("string");
    (0, vitest_1.expect)(user.email).toBeDefined();
    (0, vitest_1.expect)(user.email).toBeTypeOf("string");
};
exports.userDefaultExpects = userDefaultExpects;

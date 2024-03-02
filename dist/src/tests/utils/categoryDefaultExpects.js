"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryDefaultExpects = void 0;
const vitest_1 = require("vitest");
const categoryDefaultExpects = async (category) => {
    (0, vitest_1.expect)(category).toBeDefined();
    (0, vitest_1.expect)(category).toBeTypeOf("object");
    (0, vitest_1.expect)(category.name).toBeDefined();
    (0, vitest_1.expect)(category.name).toBeTypeOf("string");
};
exports.categoryDefaultExpects = categoryDefaultExpects;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskDefaultExpects = void 0;
const vitest_1 = require("vitest");
const taskDefaultExpects = (task, userId) => {
    (0, vitest_1.expect)(task).toBeDefined();
    (0, vitest_1.expect)(task).toBeTypeOf("object");
    (0, vitest_1.expect)(task).toEqual;
    (0, vitest_1.expect)(task.id).toBeDefined();
    (0, vitest_1.expect)(task.id).toBeTypeOf("number");
    (0, vitest_1.expect)(task.title).toBeDefined();
    (0, vitest_1.expect)(task.title).toBeTypeOf("string");
    (0, vitest_1.expect)(task.content).toBeDefined();
    (0, vitest_1.expect)(task.content).toBeTypeOf("string");
    (0, vitest_1.expect)(task.finished).toBeDefined();
    (0, vitest_1.expect)(task.finished).toBeTypeOf("boolean");
};
exports.taskDefaultExpects = taskDefaultExpects;

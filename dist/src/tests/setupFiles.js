"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const app_1 = require("../app");
const prisma_1 = require("../database/prisma");
exports.request = (0, supertest_1.default)(app_1.app);
(0, vitest_1.beforeEach)(async () => {
    await prisma_1.prisma.$transaction([
        prisma_1.prisma.user.deleteMany(),
        prisma_1.prisma.category.deleteMany(),
        prisma_1.prisma.task.deleteMany(),
    ]);
});

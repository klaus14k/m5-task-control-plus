"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensure = void 0;
const prisma_1 = require("../database/prisma");
const AppError_1 = require("../errors/AppError");
class EnsureMiddleware {
    validBody = (schema) => (req, _, next) => {
        req.body = schema.parse(req.body);
        return next();
    };
    taskIdExists = async (req, _, next) => {
        const { id } = req.params;
        const foundTask = await prisma_1.prisma.task.findFirst({ where: { id: Number(id) } });
        if (!foundTask) {
            throw new AppError_1.AppError("Task not found", 404);
        }
        return next();
    };
    paramCategoryIdExists = async (req, _, next) => {
        const { id } = req.params;
        const foundCategory = await prisma_1.prisma.category.findFirst({ where: { id: Number(id) } });
        if (!foundCategory) {
            throw new AppError_1.AppError("Category not found", 404);
        }
        return next();
    };
    bodyCategoryIdExists = async (req, _, next) => {
        if (req.body.categoryId) {
            const foundCategory = await prisma_1.prisma.category.findFirst({ where: { id: Number(req.body.categoryId) } });
            if (!foundCategory) {
                throw new AppError_1.AppError("Category not found", 404);
            }
            return next();
        }
        return next();
    };
    isEmailUnique = async (req, _, next) => {
        const { email } = req.body;
        if (!email)
            return next();
        const foundEmail = await prisma_1.prisma.user.findFirst({ where: { email } });
        if (foundEmail) {
            throw new AppError_1.AppError("This email is already registered", 409);
        }
        return next();
    };
    userIdExists = async (req, _, next) => {
        if (req.body.userId) {
            const foundUser = await prisma_1.prisma.user.findFirst({ where: { id: Number(req.body.userId) } });
            if (!foundUser) {
                throw new AppError_1.AppError("User not found", 404);
            }
            return next();
        }
        return next();
    };
}
exports.ensure = new EnsureMiddleware();

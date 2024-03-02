"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permission = void 0;
const prisma_1 = require("../database/prisma");
const AppError_1 = require("../errors/AppError");
class PermissionMiddleware {
    isCategoryOwner = async (req, res, next) => {
        const userTokenId = Number(res.locals.decoded.sub);
        const foundCategory = await prisma_1.prisma.category.findFirst({ where: { id: Number(req.params.id) } });
        if (foundCategory?.userId !== userTokenId) {
            throw new AppError_1.AppError("This user is not the category owner", 403);
        }
        return next();
    };
    isTaskOwner = async (req, res, next) => {
        const userTokenId = Number(res.locals.decoded.sub);
        const foundTask = await prisma_1.prisma.task.findFirst({ where: { id: Number(req.params.id) } });
        if (foundTask?.userId !== userTokenId) {
            throw new AppError_1.AppError("This user is not the task owner", 403);
        }
        return next();
    };
}
exports.permission = new PermissionMiddleware();

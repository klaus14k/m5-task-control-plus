import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma"
import { AppError } from "../errors/AppError"

class PermissionMiddleware {
    public isCategoryOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userTokenId = Number(res.locals.decoded.sub)
        const foundCategory = await prisma.category.findFirst({ where: { id: Number(req.params.id) } })

        if (foundCategory?.userId !== userTokenId) {
            throw new AppError("This user is not the category owner", 403)
        }
        return next()
    }
    public isTaskOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userTokenId = Number(res.locals.decoded.sub)
        const foundTask = await prisma.task.findFirst({ where: { id: Number(req.params.id) } })

        if (foundTask?.userId !== userTokenId) {
            throw new AppError("This user is not the task owner", 403)
        }
        return next()
    }
}

export const permission = new PermissionMiddleware()
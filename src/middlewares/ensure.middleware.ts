import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"
import { prisma } from "../database/prisma"
import { AppError } from "../errors/AppError"

class EnsureMiddleware {
    public validBody = (schema: ZodTypeAny) => (req: Request, _: Response, next: NextFunction): void => {
        req.body = schema.parse(req.body)
        return next()
    }

    public taskIdExists = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
        const {taskId} = req.params
        const foundTask = await prisma.task.findFirst({where: {id: Number(taskId)}})

        if (!foundTask){
            throw new AppError("Task not found", 404)
        }
        return next()
    }

    public paramCategoryIdExists = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
        const {categoryId} = req.params
        const foundCategory = await prisma.category.findFirst({where: {id: Number(categoryId)}})

        if (!foundCategory){
            throw new AppError("Category not found", 404)
        }
        return next()
    }

    public bodyCategoryIdExists = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
        const foundCategory = await prisma.category.findFirst({where: {id: Number(req.body.categoryId)}})

        if (!foundCategory){
            throw new AppError("Category not found", 404)
        }
        return next()
    }
}

export const ensure = new EnsureMiddleware()
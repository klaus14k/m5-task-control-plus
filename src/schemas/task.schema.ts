import { z } from "zod"
import { categorySchema } from "./category.schema"

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullish()
})

export const createTaskSchema = taskSchema.omit({ id: true })
export const updateTaskSchema = taskSchema.partial()
export const readTaskSchema = taskSchema.extend({ category: categorySchema.nullish() }).omit({ categoryId: true })

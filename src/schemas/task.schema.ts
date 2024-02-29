import { z } from "zod"
import { categorySchema, createCategorySchema } from "./category.schema"

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string(),
    content: z.string(),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullish(),
    userId: z.number().positive()
})

export const createTaskSchema = taskSchema.omit({id: true}).extend({category: createCategorySchema})
export const readTaskSchema = taskSchema.extend({category: categorySchema.nullish()}).omit({categoryId: true})
export const updateTaskSchema = taskSchema.partial()

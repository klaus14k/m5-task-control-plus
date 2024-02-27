import { z } from "zod"

export const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string()
})

export const createCategorySchema = categorySchema.omit({id: true}).nullish()
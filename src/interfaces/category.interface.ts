import { z } from "zod"
import { categorySchema, createCategorySchema } from "../schemas/category.schema"

export type CategoryCreate = z.infer<typeof createCategorySchema>
export type CategoryReturn = z.infer<typeof categorySchema>
import { Router } from "express"
import { CategoryController } from "../controllers/categoryController"
import { ensure } from "../middlewares/ensure.middleware"
import { createCategorySchema } from "../schemas/category.schema"

export const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.post("", ensure.validBody(createCategorySchema), controller.create)
categoryRouter.delete("/:categoryId", ensure.paramCategoryIdExists, controller.delete)
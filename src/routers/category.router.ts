import { Router } from "express"
import { CategoryController } from "../controllers/categoryController"
import { ensure } from "../middlewares/ensure.middleware"
import { createCategorySchema } from "../schemas/category.schema"
import { auth } from "../middlewares/auth.middleware"
import { permission } from "../middlewares/permission.middleware"

export const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.use(auth.isAuthenticated)

categoryRouter.post("", ensure.validBody(createCategorySchema), ensure.userIdExists, controller.create)
categoryRouter.delete("/:id", ensure.paramCategoryIdExists, permission.isCategoryOwner, controller.delete)
import { Router } from "express"
import { UserController } from "../controllers/userController"
import { ensure } from "../middlewares/ensure.middleware"
import { createUserSchema } from "../schemas/user.schema"
import { auth } from "../middlewares/auth.middleware"

export const userRouter = Router()
const controller = new UserController()

userRouter.post("", ensure.validBody(createUserSchema), ensure.isEmailUnique, controller.create)
userRouter.post("/login", controller.login)
userRouter.get("/profile", auth.isAuthenticated, controller.autologin)
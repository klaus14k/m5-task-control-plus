import { Router } from "express"
import { TaskController } from "../controllers/taskController"
import { ensure } from "../middlewares/ensure.middleware"
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema"
import { auth } from "../middlewares/auth.middleware"
import { permission } from "../middlewares/permission.middleware"

export const taskRouter = Router()
const controller = new TaskController()

taskRouter.use(auth.isAuthenticated)

taskRouter.post("", ensure.validBody(createTaskSchema), ensure.bodyCategoryIdExists, controller.create)
taskRouter.get("", controller.read)
taskRouter.get("/:id", ensure.taskIdExists, permission.isTaskOwner, controller.readById)
taskRouter.patch("/:id", ensure.validBody(updateTaskSchema), ensure.taskIdExists, permission.isTaskOwner, controller.update)
taskRouter.delete("/:id", ensure.taskIdExists, permission.isTaskOwner, controller.delete)
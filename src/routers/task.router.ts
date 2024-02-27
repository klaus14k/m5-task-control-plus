import { Router } from "express"
import { TaskController } from "../controllers/taskController"
import { ensure } from "../middlewares/ensure.middleware"
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema"

export const taskRouter = Router()
const controller = new TaskController()

taskRouter.post("", ensure.validBody(createTaskSchema), controller.create)
taskRouter.get("", controller.read)
taskRouter.get("/:taskId", ensure.taskIdExists, controller.readById)
taskRouter.patch("/:taskId", ensure.validBody(updateTaskSchema), ensure.taskIdExists, controller.update)
taskRouter.delete("/:taskId", ensure.taskIdExists, controller.delete)
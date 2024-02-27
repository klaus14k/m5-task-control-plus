import { z } from "zod"
import { createTaskSchema, readTaskSchema, taskSchema, updateTaskSchema } from "../schemas/task.schema"

export type TaskCreate = z.infer<typeof createTaskSchema>
export type TaskUpdate = z.infer<typeof updateTaskSchema>
export type TaskReturn = z.infer<typeof taskSchema>
export type TaskRead = z.infer<typeof readTaskSchema>
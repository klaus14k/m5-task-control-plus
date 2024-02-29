import { z } from "zod"
import { createUserSchema, returnUserSchema } from "../schemas/user.schema"

export type UserCreate = z.infer<typeof createUserSchema>
export type UserReturn = z.infer<typeof returnUserSchema>
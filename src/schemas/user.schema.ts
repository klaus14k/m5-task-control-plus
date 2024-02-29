import { z } from "zod"

export const UserSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const createUserSchema = UserSchema.omit({id: true})
export const returnUserSchema = UserSchema.omit({password: true})
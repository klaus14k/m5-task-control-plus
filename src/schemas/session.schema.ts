import { UserSchema } from "./user.schema"

export const sessionCreateSchema = UserSchema.pick({ email: true, password: true })
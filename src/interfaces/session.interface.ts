import { z } from "zod"
import { sessionCreateSchema } from "../schemas/session.schema"
import { UserReturn } from "./user.interface"

export type SessionCreate = z.infer<typeof sessionCreateSchema>
export type SessionReturn = {
    accessToken: string,
    user: UserReturn
}
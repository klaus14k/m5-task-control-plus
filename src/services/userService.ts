import { prisma } from "../database/prisma"
import { AppError } from "../errors/AppError"
import { SessionCreate, SessionReturn } from "../interfaces/session.interface"
import { UserCreate, UserReturn } from "../interfaces/user.interface"
import { returnUserSchema } from "../schemas/user.schema"
import { sign } from "jsonwebtoken"
import { compare, hash } from "bcryptjs"

export class UserService {
    public create = async (payload: UserCreate): Promise<UserReturn> => {
        payload.password = await hash(payload.password, 10)
        const newUser = await prisma.user.create({ data: payload })

        return returnUserSchema.parse(newUser)
    }
    public login = async ({ email, password }: SessionCreate): Promise<SessionReturn> => {
        let foundUser = await prisma.user.findFirst({ where: { email } })
        if (!foundUser) {
            throw new AppError("User does not exist", 404)
        }

        const comparison = await compare(password, foundUser.password)
        if (!comparison) {
            throw new AppError("Email and password don't match", 401)
        }

        const secret = process.env.JWT_SECRET!
        const expiresIn = process.env.EXPIRES_IN!
        const accessToken = sign({ email: foundUser.email }, secret, { expiresIn, subject: String(foundUser.id) })

        return { accessToken, user: returnUserSchema.parse(foundUser) }
    }
    public autologin = async (id: string): Promise<UserReturn> => {
        const foundUser = await prisma.user.findFirst({ where: { id: Number(id) } })

        return returnUserSchema.parse(foundUser)
    }
}
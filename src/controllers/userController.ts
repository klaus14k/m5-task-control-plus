import { Request, Response } from "express"
import { UserService } from "../services/userService"

export class UserController {
    private userService = new UserService()

    public create = async (req: Request, res: Response): Promise<Response> => {
        const newUser = await this.userService.create(req.body)
        return res.status(201).json(newUser)
    }
    public login = async (req: Request, res: Response): Promise<Response> => {
        const token = await this.userService.login(req.body)
        return res.status(200).json(token)
    }
    public autologin = async (_: Request, res: Response): Promise<Response> => {
        const {sub} = res.locals.decoded

        const foundUser = await this.userService.autologin(sub)

        return res.status(200).json(foundUser)
    }
}
import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"
import { verify } from "jsonwebtoken"

class AuthMiddleware {
    public isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
        const { authorization } = req.headers
        if (!authorization) {
            throw new AppError("Token is required", 401)
        }
        const [_bearer, token] = authorization.split(" ")
        res.locals = { ...res.locals, decoded: verify(token, process.env.JWT_SECRET!) }

        return next()
    }
}

export const auth = new AuthMiddleware()
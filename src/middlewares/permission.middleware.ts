// import { NextFunction, Request, Response } from "express"
// import { prisma } from "../database/prisma"
// import { AppError } from "../errors/AppError"

// class PermissionMiddleware {
//     public isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const userTokenId = Number(res.locals.decoded.sub)
//         const userToken = await prisma.user.findFirst({where: {id: Number(req.params.userId)}})

//         if (!userToken){
//             throw new AppError("", 403)
//         }

//         userToken.
//     }
// }
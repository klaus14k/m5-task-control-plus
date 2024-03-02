"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = require("../database/prisma");
const AppError_1 = require("../errors/AppError");
const user_schema_1 = require("../schemas/user.schema");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
class UserService {
    create = async (payload) => {
        payload.password = await (0, bcryptjs_1.hash)(payload.password, 10);
        const newUser = await prisma_1.prisma.user.create({ data: payload });
        return user_schema_1.returnUserSchema.parse(newUser);
    };
    login = async ({ email, password }) => {
        let foundUser = await prisma_1.prisma.user.findFirst({ where: { email } });
        if (!foundUser) {
            throw new AppError_1.AppError("User does not exist", 404);
        }
        const comparison = await (0, bcryptjs_1.compare)(password, foundUser.password);
        if (!comparison) {
            throw new AppError_1.AppError("Email and password don't match", 401);
        }
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.EXPIRES_IN;
        const accessToken = (0, jsonwebtoken_1.sign)({ email: foundUser.email }, secret, { expiresIn, subject: String(foundUser.id) });
        return { accessToken, user: user_schema_1.returnUserSchema.parse(foundUser) };
    };
    autologin = async (id) => {
        const foundUser = await prisma_1.prisma.user.findFirst({ where: { id: Number(id) } });
        return user_schema_1.returnUserSchema.parse(foundUser);
    };
}
exports.UserService = UserService;

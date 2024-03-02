"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const AppError_1 = require("../errors/AppError");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    isAuthenticated = (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new AppError_1.AppError("Token is required", 401);
        }
        const [_bearer, token] = authorization.split(" ");
        res.locals = { ...res.locals, decoded: (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET) };
        return next();
    };
}
exports.auth = new AuthMiddleware();

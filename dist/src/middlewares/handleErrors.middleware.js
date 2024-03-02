"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const zod_1 = require("zod");
const AppError_1 = require("../errors/AppError");
const jsonwebtoken_1 = require("jsonwebtoken");
class HandleErrorMiddleware {
    static execute = (error, _, res, __) => {
        if (error instanceof AppError_1.AppError) {
            return res.status(error.status).json({ message: error.message });
        }
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return res.status(401).json({ message: error.message });
        }
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." });
    };
}
exports.handleErrors = HandleErrorMiddleware.execute;

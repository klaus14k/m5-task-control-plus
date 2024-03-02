"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    message;
    status;
    constructor(message, status = 400) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
exports.AppError = AppError;

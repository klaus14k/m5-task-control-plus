"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnUserSchema = exports.createUserSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.createUserSchema = exports.UserSchema.omit({ id: true });
exports.returnUserSchema = exports.UserSchema.omit({ password: true });

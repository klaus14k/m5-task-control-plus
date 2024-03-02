"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCreateSchema = void 0;
const user_schema_1 = require("./user.schema");
exports.sessionCreateSchema = user_schema_1.UserSchema.pick({ email: true, password: true });

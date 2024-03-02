"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvalidToken = exports.generateAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../database/prisma");
const user_mocks_1 = require("../mocks/user.mocks");
const generateAuthentication = async (user = user_mocks_1.userMock) => {
    const newUser = await prisma_1.prisma.user.create({
        data: user,
    });
    const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        subject: newUser.id.toString(),
    });
    return { user: newUser, token };
};
exports.generateAuthentication = generateAuthentication;
const generateInvalidToken = () => {
    const token = jsonwebtoken_1.default.sign({}, "INVALID_SECRET");
    return token;
};
exports.generateInvalidToken = generateInvalidToken;

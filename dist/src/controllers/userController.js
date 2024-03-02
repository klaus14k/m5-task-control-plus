"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    userService = new userService_1.UserService();
    create = async (req, res) => {
        const newUser = await this.userService.create(req.body);
        return res.status(201).json(newUser);
    };
    login = async (req, res) => {
        const token = await this.userService.login(req.body);
        return res.status(200).json(token);
    };
    autologin = async (_, res) => {
        const { sub } = res.locals.decoded;
        const foundUser = await this.userService.autologin(sub);
        return res.status(200).json(foundUser);
    };
}
exports.UserController = UserController;

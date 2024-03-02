"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const ensure_middleware_1 = require("../middlewares/ensure.middleware");
const category_schema_1 = require("../schemas/category.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
exports.categoryRouter = (0, express_1.Router)();
const controller = new categoryController_1.CategoryController();
exports.categoryRouter.use(auth_middleware_1.auth.isAuthenticated);
exports.categoryRouter.post("", ensure_middleware_1.ensure.validBody(category_schema_1.createCategorySchema), ensure_middleware_1.ensure.userIdExists, controller.create);
exports.categoryRouter.delete("/:id", ensure_middleware_1.ensure.paramCategoryIdExists, permission_middleware_1.permission.isCategoryOwner, controller.delete);
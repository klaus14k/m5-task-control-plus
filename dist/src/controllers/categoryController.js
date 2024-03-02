"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const categoryService_1 = require("../services/categoryService");
class CategoryController {
    categoryService = new categoryService_1.CategoryService();
    create = async (req, res) => {
        const newCategory = await this.categoryService.create(req.body);
        return res.status(201).json(newCategory);
    };
    delete = async (req, res) => {
        await this.categoryService.delete(req.params.id);
        return res.status(204).json();
    };
}
exports.CategoryController = CategoryController;

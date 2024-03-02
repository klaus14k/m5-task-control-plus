"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../database/prisma");
const category_schema_1 = require("../schemas/category.schema");
class CategoryService {
    create = async ({ ...payload }) => {
        const newCategory = await prisma_1.prisma.category.create({ data: payload });
        return category_schema_1.categorySchema.parse(newCategory);
    };
    delete = async (id) => {
        await prisma_1.prisma.category.delete({ where: { id: Number(id) } });
    };
}
exports.CategoryService = CategoryService;

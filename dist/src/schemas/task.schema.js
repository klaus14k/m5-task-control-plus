"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTaskSchema = exports.updateTaskSchema = exports.createTaskSchema = exports.taskSchema = void 0;
const zod_1 = require("zod");
const category_schema_1 = require("./category.schema");
exports.taskSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    finished: zod_1.z.boolean().default(false),
    categoryId: zod_1.z.number().positive().nullish()
});
exports.createTaskSchema = exports.taskSchema.omit({ id: true });
exports.updateTaskSchema = exports.taskSchema.partial();
exports.readTaskSchema = exports.taskSchema.extend({ category: category_schema_1.categorySchema.nullish() }).omit({ categoryId: true });

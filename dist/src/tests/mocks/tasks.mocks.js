"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskList = exports.getTaskWithCategory = exports.taskWithInvalidCategory = exports.invalidDataUpdateTask = exports.updateTask = exports.invalidDataTask = exports.task = void 0;
const prisma_1 = require("../../database/prisma");
exports.task = {
    title: "Lorem ipsum",
    content: "Lorem ipsum",
};
exports.invalidDataTask = {
    title: 123,
    content: 123,
};
exports.updateTask = {
    title: "Updated title",
    content: "Updated content",
    finished: true,
};
exports.invalidDataUpdateTask = {
    title: 123,
    content: 123,
    finished: "testing",
};
exports.taskWithInvalidCategory = {
    title: "Lorem ipsum",
    content: "Lorem ipsum",
    categoryId: 1,
};
const getTaskWithCategory = async () => {
    const category = await prisma_1.prisma.category.findFirst();
    return {
        title: "Lorem ipsum",
        content: "Lorem ipsum",
        categoryId: category?.id,
    };
};
exports.getTaskWithCategory = getTaskWithCategory;
const getTaskList = async (userId) => {
    const category = await prisma_1.prisma.category.findFirst();
    return [
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum",
            userId,
        },
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum",
            categoryId: category?.id,
            userId,
        },
    ];
};
exports.getTaskList = getTaskList;

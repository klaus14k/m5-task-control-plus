"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const prisma_1 = require("../../../database/prisma");
const category_mocks_1 = require("../../mocks/category.mocks");
const user_mocks_1 = require("../../mocks/user.mocks");
const setupFiles_1 = require("../../setupFiles");
const generateAuthentication_1 = require("../../utils/generateAuthentication");
const deleteCategoryBeforeEach = async () => {
    const { user: user1, token: token1 } = await (0, generateAuthentication_1.generateAuthentication)();
    const deleteCategory = await prisma_1.prisma.category.create({
        data: (0, category_mocks_1.category)(user1.id),
    });
    const { token: token2 } = await (0, generateAuthentication_1.generateAuthentication)(user_mocks_1.secondUserMock);
    return { token: token1, secondToken: token2, deleteCategory };
};
(0, vitest_1.describe)("delete category", () => {
    (0, vitest_1.it)("should be able to delete category successfully", async () => {
        const { token, deleteCategory } = await deleteCategoryBeforeEach();
        await setupFiles_1.request
            .delete(`/categories/${deleteCategory?.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204);
    });
    (0, vitest_1.it)("should throw error when try to delete a invalid category", async () => {
        const { token, deleteCategory } = await deleteCategoryBeforeEach();
        const id = deleteCategory?.id + 1;
        await setupFiles_1.request
            .delete(`/categories/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(404);
    });
    (0, vitest_1.it)("should throw error when try to delete a category from a different user", async () => {
        const { secondToken, deleteCategory } = await deleteCategoryBeforeEach();
        await setupFiles_1.request
            .delete(`/categories/${deleteCategory?.id}`)
            .set("Authorization", `Bearer ${secondToken}`)
            .expect(403);
    });
    (0, vitest_1.it)("should throw error when there is no token", async () => {
        await setupFiles_1.request.delete("/categories/1").expect(401);
    });
    (0, vitest_1.it)("should throw error when the token is invalid", async () => {
        const token = (0, generateAuthentication_1.generateInvalidToken)();
        await setupFiles_1.request
            .delete("/categories/1")
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    });
});

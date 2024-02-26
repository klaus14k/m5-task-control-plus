import { beforeEach, describe, it } from "vitest";
import { request } from "../../setupFiles";
import { prisma } from "../../../database/prisma";
import { category } from "../../mocks/category.mocks";

describe("delete category", () => {
   beforeEach(async () => {
      await prisma.category.create({ data: category });
   });

   it("should be able to delete category successfully", async () => {
      const category = await prisma.category.findFirst();

      await request.delete(`/categories/${category?.id}`).expect(204);
   });

   it("should throw error when try to delete a invalid category", async () => {
      const category = await prisma.category.findFirst();

      const id = (category?.id as number) + 1;

      await request.delete(`/categories/${id}`).expect(404);
   })
});

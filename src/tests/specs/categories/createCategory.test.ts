import { describe, expect, it } from "vitest";
import { request } from "../../setupFiles";
import { category, invalidDataCategory } from "../../mocks/category.mocks";

describe("create category", async () => {
   it("should be able to create category successfully", async () => {
      const data = await request
         .post("/categories")
         .send(category)
         .expect(201)
         .then((response) => response.body);

      expect(data).toBeDefined();
      expect(data).toBeTypeOf("object");

      expect(data.id).toBeDefined();
      expect(data.id).toBeTypeOf("number");

      expect(data.name).toBeDefined();
      expect(data.name).toBeTypeOf("string");
   });

   it("should throw error when try to create a task with a missing body parameter", async () => {
      await request.post("/categories").expect(400);
   });

   it("should throw error when try to create a task with invalid data types", async () => {
      await request.post("/categories").send(invalidDataCategory).expect(400);
   });
});

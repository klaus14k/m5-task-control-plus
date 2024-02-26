import { beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../../../database/prisma";
import { category } from "../../mocks/category.mocks";
import { getTaskList } from "../../mocks/tasks.mocks";
import { request } from "../../setupFiles";
import { taskDefaultExpects } from "../../utils/taskDefaultExpects";
import { categoryDefaultExpects } from "../../utils/categoryDefaultExpects";

describe("get tasks", () => {
   beforeEach(async () => {
      await prisma.category.create({ data: category });
      const taskList = await getTaskList();
      await prisma.task.createMany({ data: taskList });
   });

   it("should be able to get tasks successfully", async () => {
      const data = await request
         .get("/tasks")
         .expect(200)
         .then((response) => response.body);

      expect(data).toHaveLength(2);

      taskDefaultExpects(data[0]);

      expect(data[0].category).toBeNull();

      taskDefaultExpects(data[1]);

      categoryDefaultExpects(data[1].category);
   });

   it("should be able to get tasks from specific category", async () => {
      const category = await prisma.category.findFirst();

      const data = await request
         .get(`/tasks?category=${category?.name}`)
         .expect(200)
         .then((response) => response.body);

      expect(data).toHaveLength(1);

      taskDefaultExpects(data[0]);

      categoryDefaultExpects(data[0].category);
   });

   it("should be able to get a single task by the id correctly", async () => {
      const tasks = await prisma.task.findMany();

      const data = await request
         .get(`/tasks/${tasks[1].id}`)
         .expect(200)
         .then((response) => response.body);

      taskDefaultExpects(data);

      categoryDefaultExpects(data.category);
   });

   it("should be throw error when try get a task with a invalid id", async () => {
      const tasks = await prisma.task.findMany();

      const id = tasks[1].id + 1;

      await request.get(`/tasks/${id}`).expect(404);
   });
});

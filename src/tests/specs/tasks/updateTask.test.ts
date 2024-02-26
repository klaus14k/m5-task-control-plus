import { beforeEach, describe, expect, it } from "vitest";
import { request } from "../../setupFiles";
import { getTaskList, invalidDataUpdateTask, updateTask } from "../../mocks/tasks.mocks";
import { prisma } from "../../../database/prisma";
import { category } from "../../mocks/category.mocks";
import { taskDefaultExpects } from "../../utils/taskDefaultExpects";

describe("update task", () => {
   beforeEach(async () => {
      await prisma.category.create({ data: category });
      const taskList = await getTaskList();
      await prisma.task.createMany({ data: taskList });
   });

   it("should be able to update task successfully ", async () => {
      const task = await prisma.task.findFirst();

      const data = await request
         .patch(`/tasks/${task?.id}`)
         .send(updateTask)
         .expect(200)
         .then((response) => response.body);

      taskDefaultExpects(data);

      expect(data.title).toBe(updateTask.title);
      expect(data.content).toBe(updateTask.content);
      expect(data.finished).toBe(updateTask.finished);
   });

   it("should throw error when try to update a invalid task", async () => {
      const tasks = await prisma.task.findMany();

      const id = tasks[1].id + 1;

      await request
         .patch(`/tasks/${id}`)
         .expect(404)
         .then((response) => response.body);
   })

   it("should throw error when try to update a task with invalid data types", async () => {
      const task = await prisma.task.findFirst();

      await request.patch(`/tasks/${task?.id}`).send(invalidDataUpdateTask).expect(400);
   })
});

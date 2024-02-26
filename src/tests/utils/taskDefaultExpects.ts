import { expect } from "vitest";

export interface ITask {
   id: number;
   title: string;
   content: string;
   finished: boolean;
   categoryId?: number;
}

export const taskDefaultExpects = (task: ITask) => {
   expect(task).toBeDefined();
   expect(task).toBeTypeOf("object");

   expect(task.id).toBeDefined();
   expect(task.id).toBeTypeOf("number");

   expect(task.title).toBeDefined();
   expect(task.title).toBeTypeOf("string");

   expect(task.content).toBeDefined();
   expect(task.content).toBeTypeOf("string");

   expect(task.finished).toBeDefined();
   expect(task.finished).toBeTypeOf("boolean");
};

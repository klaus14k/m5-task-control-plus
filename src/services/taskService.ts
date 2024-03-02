import { prisma } from "../database/prisma"
import { AppError } from "../errors/AppError"
import { TaskCreate, TaskRead, TaskReturn, TaskUpdate } from "../interfaces/task.interface"
import { readTaskSchema, taskSchema } from "../schemas/task.schema"

export class TaskService {
    public create = async (payload: TaskCreate, userId: number): Promise<TaskReturn> => {
        const newTask = await prisma.task.create({ data: { ...payload, userId } })
        return taskSchema.parse(newTask)
    }

    public read = async (userId: number, category?: string): Promise<Array<TaskRead>> => {
        let query: any = { include: { category: true }, where: { userId } }

        if (category) {
            const whereField = { name: { equals: category, mode: "insensitive" } }
            query = { ...query, where: { ...query.where, category: whereField } }
        }

        const allTasks = await prisma.task.findMany(query)
        if (!allTasks.length) {
            throw new AppError("There are no tasks", 404)
        }

        return readTaskSchema.array().parse(allTasks)
    }

    public readById = async (id: string): Promise<TaskReturn> => {
        const task = await prisma.task.findFirst({ include: { category: true }, where: { id: Number(id) } })

        return taskSchema.parse(task)
    }

    public update = async (id: string, payload: TaskUpdate): Promise<TaskReturn> => {
        const updatedTask = await prisma.task.update({ where: { id: Number(id) }, data: payload })

        return taskSchema.parse(updatedTask)
    }

    public delete = async (id: string): Promise<void> => {
        await prisma.task.delete({ where: { id: Number(id) } })
    }
}
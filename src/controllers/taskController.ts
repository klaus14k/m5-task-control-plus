import { Request, Response } from "express"
import { TaskService } from "../services/taskService"

export class TaskController {
    private taskService: TaskService = new TaskService()

    public create = async (req: Request, res: Response): Promise<Response> => {
        const userId = Number(res.locals.decoded.sub)
        const newTask = await this.taskService.create(req.body, userId)
        return res.status(201).json(newTask)
    }

    public read = async ({ query }: Request, res: Response): Promise<Response> => {
        const userId = Number(res.locals.decoded.sub)
        const category = query.category ? String(query.category) : undefined
        const allTasks = await this.taskService.read(userId, category)
        return res.status(200).json(allTasks)
    }

    public readById = async ({ params: { id } }: Request, res: Response): Promise<Response> => {
        const task = await this.taskService.readById(id)
        return res.status(200).json(task)
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        const updatedTask = await this.taskService.update(req.params.id, req.body)

        return res.status(200).json(updatedTask)
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        await this.taskService.delete(req.params.id)
        return res.status(204).json()
    }
}
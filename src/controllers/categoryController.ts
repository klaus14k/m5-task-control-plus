import { Request, Response } from "express"
import { CategoryService } from "../services/categoryService"

export class CategoryController {
    private categoryService: CategoryService = new CategoryService()

    public create = async (req: Request, res: Response): Promise<Response> => {
        const newCategory = await this.categoryService.create(req.body)
        return res.status(201).json(newCategory)
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        await this.categoryService.delete(req.params.id)
        return res.status(204).json()
    }
}
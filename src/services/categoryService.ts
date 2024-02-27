import { prisma } from "../database/prisma"
import { CategoryCreate, CategoryReturn } from "../interfaces/category.interface"
import { categorySchema } from "../schemas/category.schema"

export class CategoryService {
    public create = async ({...payload}: CategoryCreate): Promise<CategoryReturn> => {
        const newCategory = await prisma.category.create({data: payload})

        return categorySchema.parse(newCategory)
    }

    public delete = async (categoryId: string): Promise<void> => {
        await prisma.category.delete({where: {id: Number(categoryId)}})
    }
}
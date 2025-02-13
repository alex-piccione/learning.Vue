import type Category from "@/entities/Category"
import { CategoryApi } from "./API/Category.api"
import { failed, success, type Result } from "./Result"

const date = new Date
export default class CategoryService {

    async list_2(): Promise<Result<Category[]>> {
      const result = await CategoryApi.list()
      return result.isSuccess ? success(parseCategories(result.value)) : result
    }

    list = async ():Promise<Result<Category[]>> =>
      await CategoryApi.list()

    create = async (category:Category): Promise<Result<Category>> =>
      await CategoryApi.create(category)

    delete = async (id:number) =>
      await CategoryApi.delete(id)
}

const parseCategories = (data:any):Category[] => {

  data as any[]

  const cat = Array.of<Category>()
  return cat
}

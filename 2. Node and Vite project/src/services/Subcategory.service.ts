import { SubcategoryApi } from "./API/Subcategory.api"
import { type Result } from "./Result"
import type Subcategory from "@/entities/Subcategory"

const date = new Date
export default class SubcategoryService {

    list = async (): Promise<Result<Subcategory[]>> =>
      await SubcategoryApi.list()

    create = async (category:Subcategory): Promise<Result<Subcategory>> =>
      await SubcategoryApi.create(category)
}

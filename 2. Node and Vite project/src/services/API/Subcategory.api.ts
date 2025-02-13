import { success } from "../Result"
import api, { manageError } from "./api"
import type Subcategory from "@/entities/Subcategory"

export const SubcategoryApi = {
  list: async() =>
    api.get<Subcategory[]>("/subcategory")
      .then(ok => success(ok.data))
      .catch(manageError),

  create: async(category:Subcategory) =>
    api.post<Subcategory>("/subcategory", category)
      .then(ok => success(ok.data))
      .catch(manageError)
}

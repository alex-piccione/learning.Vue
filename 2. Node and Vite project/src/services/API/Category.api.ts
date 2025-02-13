import { success } from "../Result"
import api, { manageError } from "./api"
import type Category from "@/entities/Category"

export const CategoryApi = {
  list: async() =>
    //api<Category[]>({method: "LIST", url: "/category"})
    api.get<Category[]>("/category")
      .then(ok => success(ok.data))
      .catch(manageError),

  create: async(category:Category) =>
    api.post<Category>("/category", category)
      .then(ok => success(ok.data))
      .catch(manageError),

  delete: async(id:number) =>
    api.delete("/category/" + id)
      .then(ok => success(null))
      .catch(manageError),
}

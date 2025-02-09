import type { AxiosResponse } from "axios"
import { success } from "../Result"
import api, { manageError } from "./api"
import type Category from "@/entities/Category"

export const CategoryApi = {
  list: async() =>
    //api<Category[]>({method: "LIST", url: "/category"})
    api.get<Category[]>("/category")
      .then(ok => success(ok.data))
      .catch(manageError)
}

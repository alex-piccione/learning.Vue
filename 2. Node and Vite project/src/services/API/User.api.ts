import { success, type Result } from "../Result"
import api, { manageError } from "./api"

export interface LoginResponse {
    username: string
    authToken: string
    authTokenExpiresAt: Date
}

export const UserApi = {
    login: async (username:string, password:string): Promise<Result<LoginResponse>> => {
      const params = new URLSearchParams({
          username: username,
          password: password
        })

      return api.get<LoginResponse>(`/user/login?${params.toString()}`)
        .then(ok => success(ok.data) )
        .catch(manageError)
    },
}

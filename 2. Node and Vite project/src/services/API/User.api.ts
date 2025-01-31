import { success, type Result } from "../Result"
import api, { manageError } from "./api"

export interface LoginResponse {
  username: string
  authToken: string
  authTokenExpiresAt: Date
}


export interface CreateUserRequest {
  email: string
  username: string | null
  password: string
}
export interface CreateUserResponse {
  id: string,
  uasername: string | null
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

  create: async (request: CreateUserRequest): Promise<Result<CreateUserResponse>> => {
    // TODO: pass authToken
    return api.post<CreateUserResponse>(`/user`, request)
      .then(ok => success(ok.data) )
      .catch(manageError)
  }
}

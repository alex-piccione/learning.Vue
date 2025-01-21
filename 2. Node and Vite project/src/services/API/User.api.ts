import api, { manageError } from "./api"

export interface LoginResponse {
    username: string
    authToken: string
    authTokenExpiresAt: Date
}

export const UserApi = {

    login: async (username:string, password:string): Promise<LoginResponse|string> => {
        const params = new URLSearchParams({
            username: username,
            password: password
          })

        return api.get<LoginResponse>(`/user/login?${params.toString()}`)
          .then(ok => ok.data )
          .catch(manageError)
    }

}

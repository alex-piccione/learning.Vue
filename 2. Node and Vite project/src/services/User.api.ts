import api from "./api"

const basePAth = "/user"

export const UserApi = {

    login: async (username:string, password:string) => {
        const params = new URLSearchParams({
            username: username,
            password: password
          })
        return (await api.get(`/user/login?${params.toString()}`)).data
    }

}
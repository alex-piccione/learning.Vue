import { UserApi, type LoginResponse } from "./API/User.api"
import CookieService from "./Cookies.service"

const AuthToken = "AuthToken"
export default class AuthService {
    
    static authToken:string|undefined = undefined

    login = async (username:string, password:string) => {
        let response = await UserApi.login(username, password)
        if (typeof response === "string")
        {
            console.error(`Failed to login. ${response}`)
            return response
        }

        const loginResponse = response as LoginResponse        
        CookieService.setCookie(AuthToken, loginResponse.authToken, loginResponse.authTokenExpiration)
        AuthService.authToken = loginResponse.authToken
        return null
    }

    getAuthToken = CookieService.readCookie(AuthToken)
}
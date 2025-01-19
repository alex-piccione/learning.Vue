import { UserApi, type LoginResponse } from './API/User.api'
import CookieService from './Cookies.service'
import { useUserStore } from '@/stores/UserStore'
import { success, failed, type Result } from './Result'

//const userStore = useUserStore()
const AuthToken = 'AuthToken'

export default class AuthService {
  login = async (username: string, password: string): Promise<Result<LoginResponse>> => {
    console.log("login")

    const response = await UserApi.login(username, password)
    if (typeof response === 'string') {
      console.error(`Failed to login. ${response}`)
      return failed(response)
    }

    const loginResponse = response as LoginResponse
    //userStore.login({ isAuthenticated: true, username: loginResponse.username, authToken: loginResponse.authToken })
    CookieService.setCookie(AuthToken, loginResponse.authToken, loginResponse.authTokenExpiresAt)

    return success(loginResponse)
  }

  logout = () => {
    console.log("logout")
    const userStore = useUserStore()
    console.log(`logout start. ${userStore.isAuthenticated}`)
    userStore.logout()
    CookieService.removeCookie(AuthToken)
    console.log(`logout end. ${userStore.isAuthenticated}`)
  }

  getAuthToken = CookieService.readCookie(AuthToken)
}

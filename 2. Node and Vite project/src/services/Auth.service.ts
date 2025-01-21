import { UserApi, type LoginResponse } from './API/User.api'
import CookieService from './Cookies.service'
import { useUserStore } from '@/stores/UserStore'
import { success, failed, type Result } from './Result'

export default class AuthService {

  login = async (username: string, password: string): Promise<Result<LoginResponse>> => {
    console.log("AuthService login")

    const response = await UserApi.login(username, password)
    if (typeof response === 'string') {
      console.error(`Failed to login. ${response}`)
      return failed(response)
    }

    const loginResponse = response as LoginResponse

    const userStore = useUserStore()
    userStore.login({ isAuthenticated: true, username: loginResponse.username, authToken: loginResponse.authToken })

    CookieService.setCookie("AuthToken", loginResponse.authToken, loginResponse.authTokenExpiresAt)
    CookieService.setCookie("Username", loginResponse.username, loginResponse.authTokenExpiresAt)
    console.log("AuthService login  cookies set")
    return success(loginResponse)
  }

  logout = () => {
    console.log("logout")
    const userStore = useUserStore()
    console.log(`logout start. ${userStore.isAuthenticated}`)
    userStore.logout()
    CookieService.removeCookie("AuthToken")
    CookieService.removeCookie("Username")
    console.log(`logout end. ${userStore.isAuthenticated}`)
  }

  checkAuthentication = (trigger: string) => {
    console.log(`checkAuthentication (${trigger})`)
    // check if user was logged in looking at cookie
    const authToken = CookieService.readCookie("AuthToken")
    const username = CookieService.readCookie("Username")
    if (authToken && username)
    {
      const userStore = useUserStore()
      userStore.login({isAuthenticated: true, authToken, username})
    }
  }
}

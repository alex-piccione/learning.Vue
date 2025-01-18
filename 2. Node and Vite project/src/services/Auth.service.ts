import { UserApi, type LoginResponse } from './API/User.api'
import CookieService from './Cookies.service'
import { useUserStore } from '@/stores/UserStore'

//const userStore = useUserStore()
const AuthToken = 'AuthToken'

export default class AuthService {
  login = async (username: string, password: string) => {
    const response = await UserApi.login(username, password)
    if (typeof response === 'string') {
      console.error(`Failed to login. ${response}`)
      return response
    }

    const loginResponse = response as LoginResponse

    const userStore = useUserStore()
    userStore.login({ isAuthenticated: true, username: loginResponse.username, authToken: loginResponse.authToken })
    CookieService.setCookie(AuthToken, loginResponse.authToken, loginResponse.authTokenExpiresAt)
  }

  logout = () => {
    const userStore = useUserStore()
    userStore.logout()
    CookieService.removeCookie(AuthToken)
  }

  getAuthToken = CookieService.readCookie(AuthToken)
}

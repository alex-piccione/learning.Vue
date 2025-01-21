import { UserApi } from './API/User.api'
import CookieService from './Cookies.service'
import { useUserStore } from '@/stores/UserStore'
import { success, failed, type Result } from './Result'

export default class AuthService {

  login = async (username: string, password: string): Promise<Result<void>> => {

    const result = await UserApi.login(username, password)

    if (result.isSuccess)
    {
      const {username, authToken, authTokenExpiresAt} = result.value
      const userStore = useUserStore()
      userStore.login({ isAuthenticated: true, username: username, authToken: authToken })

      CookieService.setCookie("AuthToken", authToken, authTokenExpiresAt)
      CookieService.setCookie("Username", username, authTokenExpiresAt)

      return success(undefined)
    }
    else
    {
      return failed(result.error)
    }
  }

  logout = () => {
    const userStore = useUserStore()
    userStore.logout()
    CookieService.removeCookie("AuthToken")
    CookieService.removeCookie("Username")
  }

  checkAuthentication = (trigger: string) => {
    console.log(`checkAuthentication (${trigger})`)
    // check if user was logged in looking at cookies
    const authToken = CookieService.readCookie("AuthToken")
    const username = CookieService.readCookie("Username")
    if (authToken && username)
    {
      const userStore = useUserStore()
      userStore.login({isAuthenticated: true, authToken, username})
    }
  }
}

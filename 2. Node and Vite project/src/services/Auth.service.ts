import { UserApi } from './API/User.api'
import CookieService from './Cookies.service'
import { useUserStore } from '@/stores/UserStore'
import { success, failed, type Result } from './Result'
import { redirectToHome } from '@/router'
import { debug } from '@/utils'

export default class AuthService {

  login = async (username: string, password: string): Promise<Result<void>> => {

    const result = await UserApi.login(username, password)

    if (result.isSuccess)
    {
      const {username, authToken, authTokenExpiresAt} = result.value
      const userStore = useUserStore()
      userStore.login({ isAuthenticated: true, username: username, authToken: authToken })

      CookieService.setCookie("AuthToken", authToken, authTokenExpiresAt)

      return success(undefined)
    }
    else return failed(result.error)
  }

  logout = () => {
    const userStore = useUserStore()
    userStore.logout()
    CookieService.removeCookie("AuthToken")
    redirectToHome()
  }

  // check the auth cookie and restore user session if exists
  checkAuthentication = async (trigger: string) => {
    debug(`checkAuthentication (${trigger})`)
    // check if user was logged in, looking at cookies
    const authToken = CookieService.readCookie("AuthToken", `"checkAuthentication (${trigger})"`)
    const userStore = useUserStore()
    if (authToken)
    {
      const result = await UserApi.loginInfo()
      if (result.isSuccess)
      {
        debug(`checkAuthentication: OK. ${result.value.authToken}`)
        const {username, authToken, authTokenExpiresAt} = result.value

        CookieService.setCookie("AuthToken", authToken, authTokenExpiresAt)
        userStore.login({ isAuthenticated: true, username: username, authToken: authToken })
        return success(true)
      }
      else return failed(result.error)
    }

    userStore.logout()
    return success(false)
  }
}

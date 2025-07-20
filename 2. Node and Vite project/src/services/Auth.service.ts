import { UserApi, type VerifyEmail } from './API/User.api'
import CookieService from './Cookies.service'
import { useUserStore } from '@/stores/UserStore'
import { success, failed, type Result } from './Result'
import { redirectToHome } from '@/router'
import { debug } from '@/utils'
import configuration from '@/configuration'

const authCookie = 'AuthToken'

export default class AuthService {
  login = async (usernameOrEmail: string, password: string): Promise<Result<void>> => {
    const result = await UserApi.login(usernameOrEmail, password)

    if (result.isSuccess) {
      const { username, authToken, authTokenExpiresAt } = result.value
      const userStore = useUserStore()
      userStore.login({ isAuthenticated: true, username: username, authToken: authToken })

      CookieService.setCookie(authCookie, authToken, authTokenExpiresAt)

      return success(undefined)
    } else return failed(result.error)
  }

  logout = () => {
    const userStore = useUserStore()
    userStore.logout()
    CookieService.removeCookie(authCookie)
    redirectToHome()
  }

  verifyEmail = async (email: string, verificationCode: string): Promise<Result<boolean>> => {
    const response = await UserApi.verifyEmail({ email, verificationCode })
    if (response.isSuccess) {
      return success(response.value.verified)
    } else {
      return failed(response.error)
    }
  }

  // Ask for email to reset the password
  forgotPassword = async (usernameOrEmail: string) => {
    let urlTemplate = `${window.location.origin}/reset-password?requestCode={code}`
    console.warn(`forgotPassword: urlTemplate: ${urlTemplate}`)
    let urlRequestCodePlaceholder = '{code}'
    const request = { usernameOrEmail, urlTemplate, urlRequestCodePlaceholder }
    const response = await UserApi.forgotPassword(request)

    return response.isSuccess
      ? response.value.isSuccess
        ? success(true)
        : failed(response.value.error || 'Unknown error')
      : failed(response.error)
  }

  // Reset the password for the user
  resetPassword = async (requestCode: string, password: string) => {
    const request = { requestToken: requestCode, newPassword: password }
    const response = await UserApi.resetPassword(request)

    return response.isSuccess
      ? response.value.isSuccess
        ? success(true)
        : failed(response.value.error || 'Unknown error')
      : failed(response.error)
  }

  // Check the auth cookie and restore user session if exists
  checkAuthentication = async (trigger: string) => {
    debug(`checkAuthentication (${trigger})`)
    // check if user was logged in, looking at cookies
    const authToken = CookieService.readCookie(authCookie, `"checkAuthentication (${trigger})"`)
    const userStore = useUserStore()
    if (authToken !== null) {
      const result = await UserApi.loginInfo()
      if (result.isSuccess) {
        debug(`checkAuthentication: OK. ${authToken}`)
        //const { username, authToken, authTokenExpiresAt } = result.value
        const { username } = result.value
        //CookieService.setCookie('AuthToken', authToken, authTokenExpiresAt)
        userStore.login({ isAuthenticated: true, username: username, authToken: authToken })
        return success(true)
      } else return failed(result.error)
    }

    userStore.logout()
    return success(false)
  }
}

import { UserApi } from './API/User.api'
import CookieService from './Cookies.service'
import { useUserStore } from '@/stores/UserStore'
import { success, failed, type Result } from './Result'
import { redirectToHome } from '@/router'
import { debug } from '@/utils'

export default class AuthService {
  login = async (usernameOrEmail: string, password: string): Promise<Result<void>> => {
    const result = await UserApi.login(usernameOrEmail, password)

    if (result.isSuccess) {
      const { username, authToken, refreshToken, authTokenExpiresAt } = result.value
      const userStore = useUserStore()
      userStore.login({ isAuthenticated: true, username: username, authToken: authToken })

      debug(`AuthService.login: OK. Set authToken cookie ${authToken}`)
      CookieService.setCookie('AuthToken', authToken, authTokenExpiresAt)
      CookieService.setCookie('RefreshToken', refreshToken, authTokenExpiresAt)

      return success(undefined)
    } else return failed(result.error)
  }

  logout = () => {
    const userStore = useUserStore()
    userStore.logout()
    CookieService.removeCookie('AuthToken')
    CookieService.removeCookie('RefreshToken')
    redirectToHome()
  }

  /*
  refreshSession = async (): Promise<Result<void>> => {
    const result = await UserApi.refeshToken()

    if (result.isSuccess) {
      const { username, authToken, authTokenExpiresAt } = result.value
  }
      */

  // Check the auth cookie and restore user session if exists, or exit it instead
  checkExistingSession = async (trigger: string) => {
    // check if user was logged in or off by another browser tab, looking at auth cookie
    const userStore = useUserStore()
    const authToken = CookieService.readCookie('AuthToken', `"checkExistingSession (trigger: ${trigger})"`)
    const refreshToken = CookieService.readCookie('RefreshToken', `"checkExistingSession (trigger: ${trigger})"`)

    debug(
      `checkExistingSession (${trigger}). userStore.isAuthenticated: ${userStore.isAuthenticated}, authToken: ${authToken}, refreshToken: ${refreshToken}`,
    )

    if (authToken === null) {
      debug('authToken === null')
      userStore.logout()
      return success(false)
    } else if (refreshToken === null) {
      debug('refreshToken === null')
      userStore.logout()
      return success(false)
    } else {
      debug('get user info using auth cookie')

      const result = await UserApi.userInfo()
      if (result.isSuccess) {
        debug(`checkExistingSession: OK. authToken: ${authToken}`)
        //const { username, authToken, authTokenExpiresAt } = result.value
        const { username } = result.value
        userStore.login({ isAuthenticated: true, username: username, authToken: authToken })
        return success(true)
      } else return failed(result.error)
    }
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
}

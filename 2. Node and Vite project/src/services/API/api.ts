import axios from 'axios'
import Configuration from '@/configuration'
import { addAxiosDateTransformer } from 'axios-date-transformer'
import { failed, type Result } from '../Result'
import CookieService from '../Cookies.service'
import { redirectToHome } from '@/router'
import { debug } from '@/utils'
import { apiInfoProvider } from '@/providers/ApiInfoProvider'
import configuration from '@/configuration'
import type { RefreshToken } from './Auth.api.types'

let api = axios.create({
  baseURL: Configuration.apiUrl,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// AXIOS does not return Date type (it uses string type)
api = addAxiosDateTransformer(api)

export const manageError = (err: Error) => {
  if (axios.isAxiosError(err) && err.response) {
    // Extract error message from API JSON esponse

    debug(`error.response:`, err.response)
    const { error } = err.response.data // "error" and "code" are fields of the API JSON response

    if (err.response.status === 401) {
      console.error('Auth token is expired or missed')
      redirectToHome()
      return failed(err.message)
    }

    if (error === undefined) {
      console.error('Failed to parse API Error:', err.response)
      return failed(err.message)
    } else {
      console.error('API Error:', error)
      return failed(error)
    }
  } else {
    // Handle other types of errors
    console.error('Error:', err.message)
    return failed(err.message)
  }
}

const refreshToken = async () => {
  const refreshToken = CookieService.readCookie('RefreshToken', 'api.refreshToken')
  if (!refreshToken) {
    console.error('Refresh token is not set in cookies')
    return Promise.reject('Refresh token is not set in cookies')
  }

  const request = { refreshToken }

  return api
    .post<RefreshToken.Response>('/refresh-token', request)
    .then((response) => {
      const { authToken, authTokenExpiresAt, refreshToken, refreshTokenExpiresAt } = response.data
      CookieService.setCookie('AuthToken', authToken, authTokenExpiresAt)
      CookieService.setCookie('RefreshToken', refreshToken, refreshTokenExpiresAt)
      //return response.data
    })
    .catch(manageError)
}

export async function extendApi(): Promise<void> {
  const authTokenHeader = await apiInfoProvider.getAuthTokenHeader()
  debug(`extendApi | authTokenHeader: ${authTokenHeader}`)

  api.interceptors.request.use((request) => {
    // add the Authentication token to the request
    const authToken = CookieService.readCookie('AuthToken', `api.interceptors.request (${request.url})`)
    if (!authToken) debug(`Auth token is not set for request: ${request.url}`)
    else debug(`Set auth token for '${authTokenHeader}' header for request: ${request.url}`)

    if (authTokenHeader === null) {
      console.error('api.interceptors.request. Auth token header is not set.')
    } else {
      //authToken && (request.headers[authTokenHeader] = authToken)
      request.headers[authTokenHeader] = authToken
    }

    console.log('Headers after modification:', request.headers)
    return request
  })

  api.interceptors.response.use(
    (response) => {
      // Always return the response for successful requests
      return response
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        // handle specific error codes for token expired and session expired
        if (error.response?.status === 401) {
          const errorCode = error.response.data?.code
          const message = error.response.data?.message || 'Unauthorized'

          // Case for Session expired or Refresh Token expired (cannot refresh auth token)
          if (errorCode === 'SESSION_EXPIRED' || errorCode === 'REFRESH_TOKEN_EXPIRED') {
            debug(`Session expired.`)
            // TODO: replace with a goto "/session-expired"
            redirectToHome()
            //return Promise.reject(message)
            // Case for Token expired (can refresh auth token)
          } else if (errorCode === 'TOKEN_EXPIRED') {
            debug(`Auth token is expired. refresh.`)
            return refreshToken()
              .then(() => {
                debug(`Token refreshed. Now retrying original request.`)
                // Check if error.config is defined before retrying
                if (error.config) {
                  // Safely retry the original request
                  return api.request(error.config)
                } else {
                  // If config is undefined, we cannot retry. Log and reject.
                  console.error('Axios error.config was undefined, cannot retry original request.')
                  debug('Axios error.config was undefined for TOKEN_EXPIRED retry attempt.')
                  redirectToHome() // Or handle as a non-recoverable error
                  return Promise.reject(new Error('Cannot retry request: original config missing.'))
                }
              })
              .catch((error) => {
                console.error(`Failed to refresh token: ${error}`)
                redirectToHome()
              })
          } else if (errorCode === 'MISSING_AUTH_TOKEN' || errorCode === 'UNKNOWN_AUTH_TOKEN') {
            console.error(`API response error. ErrorCode: ${errorCode}. ${error}`)
            debug(`API response error. ${error}`)
          } else {
            console.error(`API response error. Unknown error code: ${errorCode}. ${error}`)
            debug(`API response error. ${error}`)
          }
          return Promise.reject(message)
        }
      }

      return Promise.reject(`API response error. ${error}`)
    },
  )
}

export interface InfoResponse {
  environment: string
  version: string
  authTokenHeader: string
}

export const getInfo = async () => (await api.get<InfoResponse>('/info')).data

export default api

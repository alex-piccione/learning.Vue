import { success, type Result } from '../Result'
import api, { manageError } from './api'
import type * as types from './User.api.types'

export const UserApi = {
  login: async (usernameOrEmail: string, password: string): Promise<Result<types.LoginResponse>> => {
    const data = {
      usernameOrEmail,
      password,
    }

    return (
      api
        //.post<LoginResponse>(`/login?${params.toString()}`)
        .post<types.LoginResponse>(`/login`, data)
        .then((ok) => success(ok.data))
        .catch(manageError)
    )
  },

  loginInfo: async (): Promise<Result<types.UserInfoResponse>> => {
    return api
      .get<types.UserInfoResponse>(`/user/info`)
      .then((ok) => success(ok.data))
      .catch(manageError)
  },

  signup: async (request: types.Signup.Request): Promise<Result<types.Signup.Response>> => {
    // TODO: pass authToken
    return api
      .post<types.Signup.Response>(`/signup`, request)
      .then((ok) => success(ok.data))
      .catch(manageError)
  },

  verifyEmail: async (request: types.VerifyEmail.Request): Promise<Result<types.VerifyEmail.Response>> => {
    return api
      .post<types.VerifyEmail.Response>(`/verify-email`, request)
      .then((ok) => success(ok.data))
      .catch(manageError)
  },

  forgotPassword: async (request: types.ForgotPassword.Request): Promise<Result<types.ForgotPassword.Response>> => {
    return api
      .post<types.ForgotPassword.Response>(`/forgot-password`, request)
      .then((ok) => success(ok.data))
      .catch(manageError)
  },

  resetPassword: async (request: types.ResetPassword.Request): Promise<Result<types.ResetPassword.Response>> => {
    return api
      .post<types.ResetPassword.Response>(`/reset-password`, request)
      .then((ok) => success(ok.data))
      .catch(manageError)
  },
}

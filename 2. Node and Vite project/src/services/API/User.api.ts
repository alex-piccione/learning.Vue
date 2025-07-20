import { success, type Result } from '../Result'
import api, { manageError } from './api'

export interface LoginResponse {
  username: string
  authToken: string
  authTokenExpiresAt: Date
  refreshToken: string
}

export interface UserInfoResponse {
  username: string
}

export namespace Signup {
  export interface Request {
    email: string
    username: string | null
    password: string
  }
  export interface Response {
    id: string
    username: string
    authToken: string
    authTokenExpiresAt: Date
  }
}

export namespace VerifyEmail {
  export interface Request {}
  export interface Response {
    verified: boolean
  }
}

export namespace ForgotPassword {
  export interface Request {
    usernameOrEmail: string
    urlTemplate: string
    urlRequestCodePlaceholder: string
  }
  export interface Response {
    isSuccess: boolean
    error: string | null
  }
}

export namespace ResetPassword {
  export interface Request {
    requestToken: string
    newPassword: string
  }
  export interface Response {
    isSuccess: boolean
    error: string | null
  }
}

/*
export interface SignupRequest {
  email: string
  username: string | null
  password: string
}
export interface SignupResponse {
  id: string
  username: string
  authToken: string
  authTokenExpiresAt: Date
}*/

export const UserApi = {
  login: async (usernameOrEmail: string, password: string): Promise<Result<LoginResponse>> => {
    const data = {
      usernameOrEmail,
      password,
    }

    return (
      api
        //.post<LoginResponse>(`/login?${params.toString()}`)
        .post<LoginResponse>(`/login`, data)
        .then((ok) => success(ok.data))
        .catch(manageError)
    )
  },

  loginInfo: async (): Promise<Result<UserInfoResponse>> => {
    return api
      .get<UserInfoResponse>(`/user/info`)
      .then((ok) => success(ok.data))
      .catch(manageError)
  },

  signup: async (request: Signup.Request): Promise<Result<Signup.Response>> => {
    // TODO: pass authToken
    return api
      .post<Signup.Response>(`/signup`, request)
      .then((ok) => success(ok.data))
      .catch(manageError)
  },

  verifyEmail: async (request: VerifyEmail.Request): Promise<Result<VerifyEmail.Response>> => {
    return api
      .post<VerifyEmail.Response>(`/verify-email`, request)
      .then((ok) => success(ok.data))
      .catch(manageError)
  },

  forgotPassword: async (request: ForgotPassword.Request): Promise<Result<ForgotPassword.Response>> => {
    return api
      .post<ForgotPassword.Response>(`/forgot-password`, request)
      .then((ok) => success(ok.data))
      .catch(manageError)
  },

  resetPassword: async (request: ResetPassword.Request): Promise<Result<ResetPassword.Response>> => {
    return api
      .post<ResetPassword.Response>(`/reset-password`, request)
      .then((ok) => success(ok.data))
      .catch(manageError)
  },
}

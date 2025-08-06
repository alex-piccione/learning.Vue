export interface LoginResponse {
  username: string
  authToken: string
  authTokenExpiresAt: Date
  refreshToken: string
  refreshTokenExpiresAt: Date
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

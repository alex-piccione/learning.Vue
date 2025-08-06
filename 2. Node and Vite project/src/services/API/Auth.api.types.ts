export namespace RefreshToken {
  export interface Response {
    authToken: string
    authTokenExpiresAt: Date
    refreshToken: string
    refreshTokenExpiresAt: Date
  }
}

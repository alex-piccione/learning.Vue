type cookie = "AuthToken" | "Username"

export default class CookieService {
    static readCookie = (name:cookie) =>
      document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))
        ?.split('=')[1] ?? null

    /*static setCookie = (name:string, value:string, durationInMinutes:number) => {
      const durationInMs = durationInMinutes * 60 * 24 * 7
      const expiresAt = new Date(Date.now() + durationInMs)
      document.cookie = `${name}=${value}; expires=${expiresAt.toUTCString()}; path=/; secure;`
    }*/

    // can't use HttpOnly because it is not clear how the hell it works.
    static setCookie = (name:cookie, value:string, expiresAt:Date) => {
      document.cookie = `${name}=${value}; expires=${expiresAt.toUTCString()}; path=/; secure; SameSite=Strict;`
    }

    static removeCookie = (name:cookie) => {
      console.log("remove cookie")
      document.cookie = `${name}=; expires=${new Date().toUTCString()}; path=/; secure; SameSite=Strict;`
    }
}

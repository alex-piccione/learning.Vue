import { debug } from "@/utils"

type cookie = "AuthToken" | "Username"

export default class CookieService {
  static readCookie = (name:cookie, trigger:string) => {
    debug(`readCookie ${name} (for ${trigger}): ${document.cookie}`)
    // TODO read all values of cookie
    const cookies = document.cookie.split('; ')
    const cookie = cookies.find( c => c.startsWith(`${name}=`))
    if (cookie) {
      debug(`cookie ${name}: ${cookie}`)
      const value = cookie.split("=")[1]
      return value
    }
    else {
      return null
    }
  }
  //    document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))
  //      ?.split('=')[1] ?? null


  // can't use HttpOnly because it is not clear how the hell it works.
  static setCookie = (name:cookie, value:string, expiresAt:Date) => {
    document.cookie = `${name}=${value}; expires=${expiresAt.toUTCString()}; path=/; secure; SameSite=Strict;`
  }

  static removeCookie = (name:cookie) => {
    debug("remove cookie")
    document.cookie = `${name}=; expires=${new Date().toUTCString()}; path=/; secure; SameSite=Strict;`
  }
}

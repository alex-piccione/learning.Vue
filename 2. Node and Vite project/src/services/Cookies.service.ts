import { debug } from '@/utils'

type cookie = 'AuthToken' | 'RefreshToken' | 'Username'

export default class CookieService {
  static readCookie = (name: cookie, caller: string) => {
    // Read all values of cookie and return first
    const cookies = document.cookie.split('; ')
    const cookie = cookies.find((c) => c.startsWith(`${name}=`))
    const value = cookie?.split('=')[1] || null
    debug(`readCookie "${name}" (for ${caller}): ${value}`)
    return value
  }

  // can't use HttpOnly because it is not clear how the hell it works.
  // "secure" requires HTTPS, so it is not used in development.
  static setCookie = (name: cookie, value: string, expiresAt: Date) => {
    debug(`set cookie "${name}". Expires: ${expiresAt.toUTCString()}`)
    let cookie = `${name}=${value}; expires=${expiresAt.toUTCString()}; path=/; SameSite=Strict;`
    if (window.location.protocol === 'https:') cookie += 'secure; '
    document.cookie = cookie
  }

  static removeCookie = (name: cookie) => {
    debug(`remove cookie "${name}"`)
    let cookie = `${name}=; expires=${new Date().toUTCString()}; path=/; SameSite=Strict;`
    if (window.location.protocol === 'https:') cookie += 'secure; '
    document.cookie = cookie
  }
}

export default class CookieService {
    static readCookie = (name:string) =>
      document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))
        ?.split('=')[1] ?? null
  
    /*static setCookie = (name:string, value:string, durationInMinutes:number) => {
      const durationInMs = durationInMinutes * 60 * 24 * 7   
      const expiresAt = new Date(Date.now() + durationInMs)
      document.cookie = `${name}=${value}; expires=${expiresAt.toUTCString()}; path=/; secure;`
    }*/

    static setCookie = (name:string, value:string, expiresAt:Date) => {
      document.cookie = `${name}=${value}; expires=${expiresAt.toUTCString()}; path=/; secure;`
    }

    static removeCookie = (name:string) => {
      document.cookie = `${name}=; expires=${new Date().toUTCString()}; path=/; secure;`
    }
}
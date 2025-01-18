import { defineStore } from 'pinia'

export interface User {
    isAuthenticated: boolean,
    username: string | null,
    authToken: string | null
}

export const useUserStore = defineStore("user", {
    state: ():User => ({
                isAuthenticated: false,
                username: null,
                authToken: null
    }),
    actions: {        
        login(newUser:User) {
            this.isAuthenticated = newUser.isAuthenticated
            this.username = newUser.username
            this.authToken = newUser.authToken
            //state = {... state, newState}
        },
        logout() {
            this.isAuthenticated = false
            this.username = null
            this.authToken = null
        }
    },
    /*getters: {
        getUser() {
          return this...;
        }
      }*/
})

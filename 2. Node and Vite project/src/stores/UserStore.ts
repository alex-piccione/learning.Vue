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
        login(user:User) {
            this.isAuthenticated = user.isAuthenticated
            this.username = user.username
            this.authToken = user.authToken
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

import {defineStore} from "pinia"


export const useCategoryStore = defineStore("category", {
  state() {
    return {
      categories: [],
    }
  },

})

import {defineStore} from "pinia"
import CategoryService from "@/services/Category.service"
import SubcategoryService from "@/services/Subcategory.service"
import { failed, success, type Result } from "@/services/Result"
import type Category from "@/entities/Category"
import type Subcategory from "@/entities/Subcategory"


const categoryService = new CategoryService()
const subcategoryService = new SubcategoryService()

export interface CategoryData extends Category{
  subcategories: Subcategory[]
}

interface CategoryState {
  //isLoading: boolean
  //error: string|null
  categories: CategoryData[]
}

export const useCategoryDataStore = defineStore("category", {
  state(): CategoryState {
    return {
      //isLoading: false,
      //error: null
      categories: [],
    }
  },

  actions: {
    async load() {
      const categories = await categoryService.list().then((result) => { //} {result.isSuccess ? result.value : ra new Error(result.error)})
        if (result.isSuccess) {
          return result.value
        } else throw new Error(`Failed to load Categories. ${result.error}`)
      })

      const subcategories = await subcategoryService.list().then((result) => {
        if (result.isSuccess) {
          return result.value
        } else throw new Error(`Failed to load Subcategories. ${result.error}`)
      })

      try {
        this.categories = categories.map((category) => ({
             ...category,
             subcategories: subcategories.filter((subcategory) => subcategory.categoryId === category.id)
            })
        )
        return success(this.categories)
      }
      catch (error) { return failed(`Failed to create Categories Data. ${error}`) }
    },

    async addCategory(category: Category):Promise<Result<CategoryData>> {
      const result = await categoryService.create(category)
      if (result.isSuccess) {
        //const categoryData: CategoryData = { ...result.value, subcategories: [] }
        category.id = result.value.id // it is not returning the full object !!
        category.createdAt = new Date()
        const categoryData: CategoryData = { ...category, subcategories: [] }
        this.categories.push(categoryData)
        return success(categoryData)
      } else return failed(`Failed to create Category. ${result.error}`)
    },

    async removeCategory(id:number) {
      return categoryService.delete(id).then((result) => {
        if(result.isSuccess)
          this.categories = this.categories.filter(c => c.id != id)
        return result
      })
    }
  }
})

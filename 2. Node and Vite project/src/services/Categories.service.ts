import type Category from "@/entities/Category"

const date = new Date

class CategoriesService {

    private categories:Category[] = [
        { Id:1, Name: "Home", Description: "Home", CreatedAt: date},
        { Id:2, Name: "Work", Description: "Job and other activities that creates income", CreatedAt: date},
        { Id:3, Name: "Hobbies", Description: "Sport, motorbike", CreatedAt: date},
    ]

    list(): Category[] { return this.categories }
}


export default CategoriesService
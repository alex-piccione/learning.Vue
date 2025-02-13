<template>
  <h1 class="page-title">Categories</h1>
  <ErrorMessage :error="error"></ErrorMessage>

  <div v-if="error == null" class="panel">
    <div v-if="viewType === View.List">
      <CategoriesTable :categories=categoriesStore.categories :select="select" @delete="remove" ></CategoriesTable>
      <div class="buttons-row">
          <Button kind="New" @Click="() => setView(View.New)"></Button>
      </div>
    </div>
    <div v-if="viewType === View.Single && selectedCategory" >
      <SingleCategory v-model:category=selectedCategory @close="setView(View.List)"></SingleCategory>
    </div>
    <div v-if="viewType === View.New">
      <CategoryNew @cancel="setView(View.List)" @created="select"></CategoryNew>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import CategoriesTable from '@/components/Category/Table.category.vue'
import CategoryNew from '@/components/Category/New.category.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Button from '@/components/controls/VButton.vue'
import SingleCategory from '@/components/Category/Single.category.vue'
import { useCategoryDataStore, type CategoryData } from '@/stores/CategoryDataStore'

enum View { List, Single, New }

const error = ref<string|null>(null)
const viewType = ref(View.List)

const setView = (newView:View) => { viewType.value = newView }
const loading = ref(true)

const categoriesStore = useCategoryDataStore()

onBeforeMount(() => {
  loading.value = true
})

onMounted(() => {
  // if still not loaded give it a try...
  if (categoriesStore.categories.length == 0) {
    console.log("loading categories")
    categoriesStore.load().then(result => {
      if (!result.isSuccess)
        error.value = result.error
    })
  }

})


const selectedCategory = ref<CategoryData|null>()
const select = (id:number) =>
{
  const sel = categoriesStore.categories.find(c => c.id === id)

  if (sel)
  {
    selectedCategory.value = sel as CategoryData
    selectedCategory.value = categoriesStore.categories.find(c => c.id === id)
    /*selectedCategory.value = sel*/
    console.log(`selectedCategory: ${sel.id}`)
    setView(View.Single)
  }
  else {
    error.value = `Category ${id} not found`
    setView(View.List)
  }
}

const remove = (id:number) => {
  categoriesStore.removeCategory(id).then(result => {
    if(result.isSuccess)
      console.info("")
    else
      error.value = result.error
  })
}

</script>

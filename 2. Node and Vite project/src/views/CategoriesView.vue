<template>
  <h1 class="page-title">Categories</h1>
  <ErrorMessage :error="error"></ErrorMessage>

  <template v-if="error == null">
    <div v-if="viewType === View.List">
      <TextButton text="Create new" @click="() => setView(View.New)"></TextButton>
      <CategoriesTable v-if="categories" :categories=categories :select="select" ></CategoriesTable>
      <div class="button-row">
          <OrangeButton text="New" @Click="() => setView(View.New)"></OrangeButton>
      </div>
    </div>
    <div v-if="viewType === View.Single && selectedCategory != null" >
      <SingleCategory v-model:category=selectedCategory></SingleCategory>
      <div class="button-row">
          <Button kind="Create" @click="setView(View.List)"></Button>
          <Button kind="Cancel" @click="setView(View.List)"></Button>
      </div>
    </div>

    <div v-if="viewType === View.New">
      <CategoryNew></CategoryNew>
      <div class="button-row">
          <Button kind="Create" @click="setView(View.List)"></Button>
          <Button kind="Cancel" @click="setView(View.List)"></Button>
      </div>
    </div>
  </template>

</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import type Category from '@/entities/Category'
import CategoryService from "@/services/Category.service"
import CategoriesTable from '@/components/Category/Table.category.vue'
import CategoryNew from '@/components/Category/New.category.vue'
import OrangeButton from '@/components/controls/OrangeButton.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Button from '@/components/controls/DefaultButton.vue'
import TextButton from '@/components/controls/TextButton.vue'
import SingleCategory from '@/components/Category/Single.category.vue'
import { useCategoryStore } from '@/stores/CategoryStore'

enum View { List, Single, New }

const error = ref<string|null>(null)
const viewType = ref(View.List)
let categories:Category[]|null = null
const setView = (newView:View) => { viewType.value = newView }
const loading = ref(true)

// TODO: use CategoryStore

const categosyStore = useCategoryStore()

onBeforeMount(() => {
  loading.value = true
})

onMounted(() => {
  new CategoryService().list()
    .then(result => {
      if (result.isSuccess) {
        categories = result.value
      } else {
        error.value = result.error
      }
  })
})


const selectedCategory = ref<Category|null>()
const select = (id:number) =>
{
  if (categories == null) return;

  const sel = categories.find(c => c.id === id)
  if (sel !== undefined)
      selectedCategory.value = sel

  setView(View.Single)
}

</script>

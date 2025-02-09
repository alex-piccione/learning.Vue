<template>
  <h1 class="page-title">Categories</h1>
  <ErrorMessage :error="error"></ErrorMessage>

  <template v-if="error == null">
    <div v-if="viewType === View.List">
      <TextButton text="Create new" @click="() => setView(View.New)"></TextButton>
      Categories: {{ categories?.length }}
      <CategoriesTable v-if="categories" :categories=categories :select="select" ></CategoriesTable>
      <div class="buttons-row">
          <Button kind="New" @Click="() => setView(View.New)"></Button>
      </div>
    </div>
    <div v-if="viewType === View.Single && selectedCategory != null" >
      <SingleCategory v-model:category=selectedCategory></SingleCategory>
      <div class="buttons-row">
          <Button kind="Create" @click="setView(View.List)"></Button>
          <Button kind="Cancel" @click="setView(View.List)"></Button>
      </div>
    </div>

    <div v-if="viewType === View.New">
      <CategoryNew @close="setView(View.List)"></CategoryNew>
    </div>
  </template>

</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import type Category from '@/entities/Category'
import CategoryService from "@/services/Category.service"
import CategoriesTable from '@/components/Category/Table.category.vue'
import CategoryNew from '@/components/Category/New.category.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Button from '@/components/controls/VButton.vue'
import TextButton from '@/components/controls/TextButton.vue'
import SingleCategory from '@/components/Category/Single.category.vue'
import { useCategoryStore } from '@/stores/CategoryStore'

enum View { List, Single, New }

const error = ref<string|null>(null)
const viewType = ref(View.List)
let categories = ref<Category[]|null>(null)
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
        categories.value = result.value
      } else {
        error.value = result.error
      }
  })
})


const selectedCategory = ref<Category|null>()
const select = (id:number) =>
{
  if (categories.value == null) return;

  const sel = categories.value.find(c => c.id === id)
  if (sel !== undefined)
      selectedCategory.value = sel

  setView(View.Single)
}

</script>

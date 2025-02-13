<template>
    <form @submit.prevent="create" class="form" autocomplete="off">
        <div class="field">
            <label for="name" class="form-label">Name</label>
            <input id="expenses-name" name="expenses-name" v-model="category.name" class="form-control" v-focus />
        </div>

        <div class="field">
            <label for="description" class="form-label">Description</label>
            <textarea id="description" name="description" v-model="category.description" class="form-control"></textarea>
        </div>

        <div class="buttons-row">
          <VButton kind="Create" submit></VButton>
          <VButton kind="Cancel" @click="emit('cancel')"></VButton>
      </div>
      <ErrorMessage :error="error"></ErrorMessage>
    </form>
</template>

<script setup lang="ts">
import {ref} from "vue"
import type Category from "@/entities/Category"
import VButton from "../controls/VButton.vue"
import ErrorMessage from "../ErrorMessage.vue"
import { useCategoryDataStore } from "@/stores/CategoryDataStore"

const emit = defineEmits(["cancel", "created"])

const category = ref<Category>({id:0, name:"", description:"", createdAt:new Date()})
const error = ref<string|null>(null)

const categoryStore = useCategoryDataStore()

const create = () => {
  error.value = null
  categoryStore.addCategory(category.value).then(result => {
    if (result.isSuccess) emit("created", result.value.id)
    else error.value = result.error
  })
}
</script>

<template>
  <TextButton text="&lArr; back to list" @click="emit('close')"></TextButton>
  <form>
    <div class="field">
      <label>Name</label>
      <span class="input">{{ category.name }}</span>
    </div>
    <div class="field">
      <label>Description</label>
      <span>{{ category.description }}</span>
    </div>
    <div class="field">
      <label>Created At</label>
      <span>{{ category.createdAt.shortDate() }}</span>
    </div>
  </form>
  <hr />
  <div>
    <h3>
      Subcategories <span style="font-size: 75%">(count: {{ category.subcategories.length }})</span>
    </h3>
    <div v-for="sub in category.subcategories">
      {{ sub.name }}
    </div>
  </div>

  <!--<div class="buttons-row">
    <VButton kind="Cancel" text="Back" @click="emit('close')"></VButton>
  </div>
  -->
</template>

<script setup lang="ts">
import type { CategoryData } from '@/stores/CategoryDataStore'
import VButton from '../controls/VButton.vue'
import TextButton from '../controls/TextButton.vue'

defineProps<{ category: CategoryData }>()
const emit = defineEmits(['close'])
</script>

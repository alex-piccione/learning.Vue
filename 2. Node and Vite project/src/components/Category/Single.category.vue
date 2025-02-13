<template>
category: {{  category.id }}
<form>
    <div class="field">
      <label>Name</label>
      <span class="inoput">{{ category.name }}</span>
    </div>
    <div class="field">
      <label>Description</label>
      <span>{{ category.description }}</span>
    </div>
    <div class="field">
      <label>Created At</label>
      <span>{{ category.createdAt.shortDate() }}</span>
    </div>
    <div class="buttons-row">
      <VButton kind="Cancel" text="Back to list" @click="emit('close')"></VButton>
    </div>

  </form>

  <div>
    <h3>Subcategories (count: {{ category.subcategories.length }})</h3>
    <div></div>


  </div>
</template>

<script setup lang="ts">
import type { CategoryData } from '@/stores/CategoryDataStore'
import VButton from '../controls/VButton.vue'

defineProps<{category:CategoryData}>()
const emit = defineEmits(["close"])

</script>

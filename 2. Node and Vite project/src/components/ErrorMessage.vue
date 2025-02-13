<template>
  <p v-show="error" class="error">{{ error }}</p>
</template>

<script setup lang="ts">
defineProps<{error: string|null}>()
</script>

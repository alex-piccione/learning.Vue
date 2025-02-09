<template v-show="error">
  <h3 class="error">{{ error }}</h3>
</template>

<script setup lang="ts">
defineProps<{error: string|null}>()

</script>

<style scoped>
.error {
  /*margin*/
}

</style>

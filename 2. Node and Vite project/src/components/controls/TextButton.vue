<template>
  <button type="button" class="button-text">
    <slot v-if="$slots.default"></slot>
    <template v-else>{{ text }}</template>
  </button>
</template>
<script setup lang="ts">

defineProps<{
    text?:string,
    //onClick: () => void  // @click="onClick"
}>()

</script>

<style scoped>
.button-text {
  padding: 0;
  margin: 0;
}
</style>

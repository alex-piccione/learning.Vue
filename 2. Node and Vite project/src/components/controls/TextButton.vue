<template>
  <button type="button" @click="onClick" class="button-text">{{ text }}</button>
</template>
  
<script setup lang="ts">
defineProps<{
    text:string,
    onClick: (ev:any) => void
}>()
</script>

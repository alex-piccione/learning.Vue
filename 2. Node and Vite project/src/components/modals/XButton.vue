<template>
  <svg @click="emit('click')" class="modal-close-button"
    focusable="false" width="2em" height="2em" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" fill="currentColor"></path>
  </svg>
</template>

<script setup lang="ts">
  const emit = defineEmits(["click"])
</script>

<style scoped>
  .modal-close-button {
    position: absolute;
    top: 0;
    right: 5px;
    cursor: pointer;
  }

  .modal-close-button:active {
    background: linear-gradient(140deg, #e0e0e080, #f0f0f020 , #efefef30);
    border-radius: var(--border-radius);
  }

  .modal-close-button:hover {
    /*box-shadow: 0 0 5px var(--color-shadow-hover);*/
    border: solid 1px #d0d0d070;
    border-radius: var(--border-radius);
  }
</style>

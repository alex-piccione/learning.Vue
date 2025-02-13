<template>
  <div id="container">
Popup : {{ kind }}
</div>
</template>

<script setup lang="ts">

type Kind = "Info" | "Warning" | "Error" | "Success"

defineProps<{kind:Kind}>()


</script>


<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  border: 10px solid red;  /* debug */
}
</style>

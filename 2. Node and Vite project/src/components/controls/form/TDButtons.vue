<template>
  <td>
    <IconDelete v-if="remove" @click="emit('remove')" class="icon" />
    <img src="../assets/icons/delete_1.svg" v-else class="icon" />
  </td>
</template>

<script setup lang="ts">
import IconDelete from '@/components/icons/IconDelete.vue'
defineProps({
  remove: Boolean
})
const emit = defineEmits(["remove"])
</script>

<template>
  <td>
    <IconDelete v-show="remove" @click="emit('remove')" class="icon" />
    <!-- v-if="remove"  -->
    <!--   <img v-else class="icon" src="../assets/icons/delete.svg" /> -->
  </td>
</template>

<script setup lang="ts">
import IconDelete from '@/components/icons/IconDelete.vue'
defineProps({
  remove: Boolean,
})
const emit = defineEmits(['remove'])
</script>

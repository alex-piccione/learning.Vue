<template>
  <td>
    <IconEdit v-show="edit" @click="emit('edit')" />
    <IconDelete v-show="remove" @click="emit('remove')" />
  </td>
</template>

<script setup lang="ts">
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'

defineProps({
  edit: Boolean,
  remove: Boolean,
})
const emit = defineEmits(['edit', 'remove'])
</script>

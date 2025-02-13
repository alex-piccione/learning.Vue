<script setup lang="ts">
    defineProps<{
        kind:Kind
        text?:string
        submit?:boolean
    }>()

    const emit = defineEmits(["click"])

    type Kind = "Generic" | "New" | "Create" | "Cancel" | "Delete"

    const buttonText = (kind:Kind, text?:string,) => text || (kind === "Generic" ? "text property is missing" : kind)
    const buttonClass = (kind:Kind) =>
      kind === "New" ? "button-new" :
      kind === "Create" ? "button-create" :
      kind === "Cancel" ? "button-cancel" :
      kind === "Delete" ? "button-delete" :
      ""
</script>

<template>
  <button
    class="button"
    :class="buttonClass(kind)"
    :type="submit === true ? 'submit' : 'button'"
    @click="emit('click')">
      {{ buttonText(kind, text) }}
  </button>
</template>


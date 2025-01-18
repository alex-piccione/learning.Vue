<script setup lang="ts">
    defineProps<{
        kind:Kind
        text?:string
        onClick:(event: MouseEvent) => void
    }>()

    type Kind = "Generic" | "Create" | "Cancel" | "Delete"

    const buttonText = (kind:Kind, text?:string,) => text || (kind === "Generic" ? "text property is missing" : kind)
    const buttonClass = (kind:Kind) =>
        kind === "Create" ? "button-create" :
        kind === "Cancel" ? "button-cancel" :
        kind === "Delete" ? "button-delete" :
        ""
</script>

<template>
    <button class="button" :class="buttonClass(kind)" @click="onClick">{{ buttonText(kind, text) }}</button>
</template>

<style scoped>
    /*@import "../../assets/base.css";*/
    @import "../../assets/CSS/base.css";

    .button {
        _color: var(--vt-c-white);
        color: var(--color-text);
        display: inline-block;
        font-weight: bold;
        padding: var(--gap-xs) var(--gap-xl);
        border: none;
        font-size: 18px;
    }

    .orange-button:hover {
        _background: radial-gradient(ellipse at center, #FF7F50 50%, #fc4300 90%,  #fc4300  100%);
        _background: radial-gradient(ellipse at center, #ff571a 50%,  #FF7F50  100%);
        background: radial-gradient(ellipse at center, #FF7F50 30%,  #ff571a  100%);
    }

    @media (prefers-color-scheme: dark) {
        .orange-button {
            background-color: #4e1400;
        }

        .orange-button:hover {
            background-color: #442216;
            background: radial-gradient(ellipse at center, #7c2100 30%,  #4e1400  100%);
        }
    }
</style>


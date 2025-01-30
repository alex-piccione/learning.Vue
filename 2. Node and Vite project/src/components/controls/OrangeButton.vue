<script setup lang="ts">
    defineProps<{
        text:string;
        onClick:(event: MouseEvent) => void
    }>()
</script>

<template>
    <button class="orange-button" @click="onClick">{{ text }}</button>
</template>

<style scoped>
    @import "../../assets/CSS/base.css";

    .orange-button {
        cursor: pointer;
        background-color: #FF7F50;
        border-radius: 5px;
        color: var(--color-text);
        display: inline-block;
        font-weight: bold;
        padding: var(--gap-xs) var(--gap-xl);
        border: none;
        font-size: 18px;
    }

    .orange-button:hover {
        background-color: #e06d3f;
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


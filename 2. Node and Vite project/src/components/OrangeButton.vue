<script setup lang="ts">
    import { defineProps } from 'vue'

    defineProps<{
        text:string; 
        onClick:(event: MouseEvent) => void
    }>()
</script>

<template>
    <button class="orange-button" @click="onClick">{{ text }}</button>    
</template>

<style scoped>
    .orange-button {
        cursor: pointer;
        background-color: #FF7F50;
        border-radius: 5px;
        color: #F4F4F4;
        display: inline-block;
        font-weight: bold;
        padding: 10px 20px;
        border: none;
        font-size: 18px;
    }

    .orange-button:hover {
        background-color: #FFA07A;
    }
</style>


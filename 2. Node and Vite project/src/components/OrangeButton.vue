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
        background-color: #e06d3f;
        _background: radial-gradient(ellipse at center, #FF7F50 50%, #fc4300 90%,  #fc4300  100%);
        _background: radial-gradient(ellipse at center, #ff571a 50%,  #FF7F50  100%);
        background: radial-gradient(ellipse at center, #FF7F50 30%,  #ff571a  100%);
    }
</style>


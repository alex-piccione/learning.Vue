<template>
    <div class="container">
        <OrangeButton text="Click here" v-on:click="onClick"></OrangeButton>
        Count: {{ counter }}
    </div>
</template>

<script setup lang="ts">
import OrangeButton from './controls/OrangeButton.vue'
import { ref } from 'vue'

const counter = ref(0)

const onClick = () => { counter.value++}

</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    gap: 1rem;

    padding: 5px;
    background-color: rgba(200, 200, 200, .2);
    border: solid 2px rgba(200, 200, 200, 0.4);
    border-bottom-color: rgba(200, 200, 200, 0.1);
    border-right-color: rgba(200, 200, 200, 0.1);
    border-radius: 5px;
}
</style>

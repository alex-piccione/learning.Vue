<script setup lang="ts">
import CounterLogic from "../logic/Counter"

import {ref} from "vue"

//const counter = ref(0)

</script>

<template>
<main>
    <div>
        Counter: {{ CounterLogic.counter }}

        <button @click="CounterLogic.increment">Increase</button>
    </div>
</main>
</template>
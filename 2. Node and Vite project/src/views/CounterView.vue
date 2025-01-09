<script setup lang="ts">

import Counter from "@/components/Counter.vue";

import CounterLogic from "../services/Counter"
import OrangeButton from "../components/controls/OrangeButton.vue"

const onClick = (event:MouseEvent) => CounterLogic.increment()

</script>

<template>
<main>
    <div>
        Counter: {{ CounterLogic.counter }}

        <OrangeButton 
            text="Increment"
            :onClick="onClick"  />
    </div>
    <br />
    <Counter></Counter>
    <br />
    <Counter></Counter>
    <br />
    <Counter></Counter>
</main>
</template>
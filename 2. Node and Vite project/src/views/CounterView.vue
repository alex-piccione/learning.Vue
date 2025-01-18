<script setup lang="ts">

import Counter from "@/components/CounterItem.vue";

import CounterLogic from "../services/Counter"
import OrangeButton from "../components/controls/OrangeButton.vue"

const onClick = () => CounterLogic.increment()

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

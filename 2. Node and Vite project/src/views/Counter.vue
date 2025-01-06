<script setup lang="ts">

import CounterLogic from "../logic/Counter"
import OrangeButton from "../components/OrangeButton.vue"

const onClick = (event:MouseEvent) => CounterLogic.increment()

</script>

<template>
<main>
    <div>
        Counter: {{ CounterLogic.counter }}

        <!--<button @click="CounterLogic.increment">Increase</button>-->
        <OrangeButton 
            text="Increment"
            :onclick="onClick"  />
    </div>
</main>
</template>
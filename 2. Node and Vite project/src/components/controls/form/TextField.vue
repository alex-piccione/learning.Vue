<template>
    <div class="form-field">
        <div class="field">{{ field }}</div>
        <input class="input" type="text" v-model="value" placeholder={{ aaa }}>
        placeholder: {{ placeholder }}
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
defineProps<{field:string, defaultValue?:string, placeholder?:string}>()
const value = ref("") 
</script>
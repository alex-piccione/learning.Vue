<template>

    <div>
        Name: {{ category.Name }}
    </div>
    <div>
        Description: {{ category.Description }}
    </div>

</template>

<script setup lang="ts">
import type Category from '@/entities/Category';

defineProps<{category:Category}>()

</script>
<template>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Subcategories</th>
                <th>Created At</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="category in categories" :data-id="category.id" :key="category.id" @dblclick="select(category.id)" class="clickable">
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td class="align-right">{{ category.subcategories.length }}</td>
                <td>{{ category.createdAt.shortDate() }}</td>
                <TDButtons remove @remove="emit('delete', category.id)"></TDButtons>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type { CategoryData } from '@/stores/CategoryDataStore'
import TDButtons from '../controls/form/TDButtons.vue';

defineProps<{
    categories:CategoryData[]
    select: (id:number) => void
  }>()

const emit = defineEmits(["delete"])

</script>

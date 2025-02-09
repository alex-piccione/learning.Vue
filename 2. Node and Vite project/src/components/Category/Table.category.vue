<template>
  Categories: {{ categories.length }}
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="category in categories" data-id="{{ category.Id }}" :key="category.id" @click="select(category.id)" class="clickable">
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>{{ category.createdAt.shortDate() }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type Category from '@/entities/Category'

defineProps<{
    categories:Category[]
    select: (id:number) => void
    }>()

</script>

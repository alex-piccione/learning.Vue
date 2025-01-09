<template>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>            
            <tr v-for="category in categories" data-id="{{ category.Id }}" @click="select(category.Id)">
                <td>{{ category.Name }}</td>
                <td>{{ category.Description }}</td>
                <td>{{ category.CreatedAt.shortDate() }}</td>
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

const selectAA = (id:number) => {
   // todo change view
}

</script>
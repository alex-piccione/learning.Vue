<template>
    <CategoriesTable :categories=categories></CategoriesTable>
</template>

<script setup lang="ts">
import type Category from '@/entities/Category'
import CategoryService from "@/services/Categories.service"
import CategoriesTable from '@/components/CategoriesTable.vue';

const categories:Category[] = new CategoryService().list()

</script>
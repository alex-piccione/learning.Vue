<template>

    <div v-if="view === View.List">
        <TextButton text="Create new" @click="setView(View.New)"></TextButton>
        <CategoriesTable :categories=categories ></CategoriesTable>
        <div class="button-row">
            <OrangeButton text="New" @Click="() => setView(View.New)"></OrangeButton>
        </div>
    </div>
    <div v-if="view === View.New">
        <CategoryNew></CategoryNew>
        <div class="button-row">
            <OrangeButton text="Create" @click="setView(View.List)"></OrangeButton>
            <OrangeButton text="Cancel" @click="setView(View.List)"></OrangeButton>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import type Category from '@/entities/Category'
import CategoryService from "@/services/Categories.service"
import CategoriesTable from '@/components/CategoriesTable.vue';
import CategoryNew from '@/components/Category.New.vue';
import OrangeButton from '@/components/controls/OrangeButton.vue';
import TextButton from '@/components/controls/TextButton.vue';

enum View { List, New }

const view = ref(View.List)
const categories:Category[] = new CategoryService().list()
const setView = (newView:View) => { view.value = newView }

</script>
<template>

    <div v-if="view === View.List">
        <TextButton text="Create new" @click="setView(View.New)"></TextButton>
        <CategoriesTable :categories=categories :select="select" ></CategoriesTable>
        <div class="button-row">
            <OrangeButton text="New" @Click="() => setView(View.New)"></OrangeButton>
        </div>
    </div>
    <div v-if="view === View.Single">
        <SingleCategory v-model:category=selectedCategory></SingleCategory>
        <div class="button-row">
            <Button kind="Create" @click="setView(View.List)"></Button>
            <Button kind="Cancel" @click="setView(View.List)"></Button>
        </div>
    </div>

    <div v-if="view === View.New">
        <CategoryNew></CategoryNew>
        <div class="button-row">
            <Button kind="Create" @click="setView(View.List)"></Button>
            <Button kind="Cancel" @click="setView(View.List)"></Button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import type Category from '@/entities/Category'
import CategoryService from "@/services/Categories.service"
import CategoriesTable from '@/components/Category/Table.category.vue';
import CategoryNew from '@/components/Category/New.category.vue';
import OrangeButton from '@/components/controls/OrangeButton.vue';
import Button from '@/components/controls/Button.vue';
import TextButton from '@/components/controls/TextButton.vue';
import SingleCategory from '@/components/Category/Single.category.vue';

enum View { List, Single, New }

const view = ref(View.List)
const categories:Category[] = new CategoryService().list()
const setView = (newView:View) => { view.value = newView }

const selectedCategory = ref({ Id:1, Name: "aaa", Description: "ddd", CreatedAt: new Date() })
const select = (id:number) => 
{
    const sel = categories.find(c => c.Id === id)
    if (sel !== undefined)
        selectedCategory.value = sel

    setView(View.Single)
}

</script>
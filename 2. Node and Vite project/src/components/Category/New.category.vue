<template>
    <form>
        <div class="form-field">
            <label for="name" class="form-label">Name</label>
            <input id="name" name="name" v-model="category.Name" class="form-control" />
        </div>

        <div class="form-field">
            <label for="description" class="form-label">Description</label>
            <textarea id="description" name="description" v-model="category.Description" class="form-control"></textarea>
        </div>
    </form>
</template>

<script setup lang="ts">
import type Category from "@/entities/Category";
import {ref} from "vue"

const category = ref<Category>({Id:0, Name:"", Description:"", CreatedAt:new Date()})

</script>
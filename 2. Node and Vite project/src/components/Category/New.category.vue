<template>
    <form>
        <div class="field">
            <label for="name" class="form-label">Name</label>
            <input id="expenses-name" name="expenses-name" v-model="category.name" class="form-control" />
        </div>

        <div class="field">
            <label for="description" class="form-label">Description</label>
            <textarea id="description" name="description" v-model="category.description" class="form-control"></textarea>
        </div>

        <div class="buttons">
          <VButton kind="Create" @click="create"></VButton>
          <VButton kind="Cancel" @click="emit('close')"></VButton>
      </div>
    </form>
</template>

<script setup lang="ts">
import type Category from "@/entities/Category";
import {ref} from "vue"
import VButton from "../controls/VButton.vue";

const emit = defineEmits(["close"])

const category = ref<Category>({id:0, name:"", description:"", createdAt:new Date()})

const create = () => {
  // todo
  emit("close")
}


</script>

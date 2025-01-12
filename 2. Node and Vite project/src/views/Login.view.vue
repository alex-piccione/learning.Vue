<template>
    <div>
    <h1>Login</h1>
    <div v-if="isLoading">loading...</div>    
    <form v-else @submit.prevent="submit">
        <div class="field">
            <label for="user">User</label>
            <input id="user" @input="clearMessage" />
        </div>
        <div class="field">
            <label for="password">Password</label>
            <input id="password" type="password" />
        </div>
        <hr />
        <div>
            <button type="submit">Login</button>
            <button type="reset">Reset</button>
            <button type="button">Cancel</button>
        </div>
    </form>
    <div v-if="message">
        <hr />
        <div>{{ message }}</div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isLoading = ref(false)
const message = ref(null)

const submit = () => {
    isLoading.value = true

    setTimeout(() =>{ isLoading.value=false }, 5000)

}

const clearMessage = () => {
    message.value = null
}

</script>

<style scoped>
input {
    text-align: center;
}
</style>

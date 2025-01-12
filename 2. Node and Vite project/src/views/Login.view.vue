<template>
<div>
    <h1>Login</h1>
    <div v-if="loading">loading...</div>    
    <form v-else @submit.prevent="submit">
        <div class="field">
            <label for="user">User</label>
            <input id="user" @input="clearMessage" v-model="loginForm.username" />
        </div>
        <div class="field">
            <label for="password">Password</label>
            <input id="password" type="password" @input="clearMessage"  v-model="loginForm.password" />
        </div>
        <hr />
        <div>
            <button type="submit">Login</button>
            <button type="reset">Reset</button>
            <button type="button">Cancel</button>
        </div>
        
        <div v-if="message" style="margin-top: 5px">
            <div class="error">{{ message }}</div>
        </div>
    </form>
</div>

</template>

<script setup lang="ts">
import AuthService from '@/services/Auth.service';
import { ref, reactive } from 'vue';

const loading = ref(false)
const message = ref<string|null>(null)

const loginForm = reactive({username:"", password:""})

const authService = new AuthService()

const submit = async () => {
    loading.value = true
    let responseError = await authService.login(loginForm.username, loginForm.password)
    loading.value = false

    if (responseError) message.value = responseError
}

const clearMessage = () => message.value = null

</script>

<style scoped>
input {
    text-align: center;
}
</style>

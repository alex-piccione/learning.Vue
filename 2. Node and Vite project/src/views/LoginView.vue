<template>
<div>
    <h1>Login</h1>
    <span>isAuthenticated: {{ userStore.isAuthenticated }}</span>
    <Loading :loading="loading" text="loading form"></Loading>
    <form v-if="! loading" @submit.prevent="submit">
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
        </div>

        <div v-if="message" style="margin-top: 5px">
            <div class="error">{{ message }}</div>
        </div>
    </form>
</div>

</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import AuthService from '@/services/Auth.service';
import { useUserStore } from '@/stores/UserStore';
import { ref, reactive } from 'vue';

const loading = ref(false)
const message = ref<string|null>(null)

const loginForm = reactive({username:"", password:""})

const userStore = useUserStore()

const authService = new AuthService()

const submit = async () => {
    loading.value = true
    const result = await authService.login(loginForm.username, loginForm.password)
    loading.value = false

    if (!result.isSuccess) {
      message.value = result.error
    }
    else {
      console.log(`login success. ${userStore.isAuthenticated}`)
      //const loginResponse = result.value
      //userStore.login({ isAuthenticated: true, username: loginResponse.username, authToken: loginResponse.authToken })
    }
}

const clearMessage = () => message.value = null

</script>

<style scoped>
input {
    text-align: center;
}
</style>

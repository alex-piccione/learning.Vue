<template>
    <div class="panel">
    <h1>Sign Up</h1>
    <Loading :loading="loading" text="loading..."></Loading>
    <form v-show="! loading" @submit.prevent="submit" autocomplete="off">
        <div class="field">
            <label for="email" class="mandatory" autocomplete="email">Email</label>
            <input id="email" type="text" v-model="formData.email"  @input="clearMessage"/>
        </div>
        <div class="field">
            <label for="username" autocomplete="expenses">Username</label>
            <input id="username" type="text" v-model="formData.username"  @input="clearMessage"/>
        </div>
        <div class="field">
            <label for="pasword" autocomplete="new-password">Password</label>
            <input id="username" type="password" v-model="formData.password"  @input="clearMessage"/>
        </div>
        <div class="field">
            <label for="passwordRepeat" autocomplete="new-password">Repeat Password</label>
            <input id="passwordRepeat" type="password" v-model="formData.passwordRepeat"  @input="clearMessage"/>
        </div>
        <div class="buttons">
          <button type="submit">Login</button>
        </div>
        <div v-show="message" style="margin-top: 5px">
        <div class="error">{{ message }}</div>
    </div>
    </form>
</div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import UserService, { type CreateRequest } from '@/services/User.service';
import { reactive, ref } from 'vue';

//const emit = defineEmits(["close"])

const loading = ref(false)
const message = ref<string|null>(null)

const userService = new UserService()

const formData = reactive({
    email:"", username:"", password:"", passwordRepeat:""
})

const submit = async () => {
  message.value = null
  loading.value = true

  const request:CreateRequest = {
    email: formData.email,
    username: formData.username,
    password: formData.password,
    passwordRepeat: formData.passwordRepeat
  }

  const result = await userService.create(request)
  loading.value = false

  if (result.isSuccess) {
    redirectToHome()
  }
  else {
    console.error(`Failed to login. ${result.error}`)
    message.value = result.error
  }
}

const clearMessage = () => message.value = null

function redirectToHome() {
    throw new Error('Function not implemented.');
}
</script>

<style scoped>
.button-submit__ {
    background-color: #4CAF50; /* Green color */
  color: white; /* White text */
  padding: 12px 24px; /* Padding */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 16px; /* Font size */
  transition: background-color 0.3s ease; /* Smooth color transition on hover */
}
</style>
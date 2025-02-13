<template>
<div class="panel">
    <h1>Sign Up</h1>
    <div style="display: none;">
      <Loading :loading="loading" text="loading..."></Loading>
    </div>
    <form _v-show="! loading" :class="{ loading: loading }"  @submit.prevent="submit" autocomplete="off">
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
          <button type="submit">Sign up</button>
        </div>
        <div style="margin-top: 5px; ">
          <div class="error" :class="{ hidden: message == ' ' }">{{ message }}</div>
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
const message = ref<string|null>(" ")

const userService = new UserService()

const formData = reactive({
    email:"", username:"", password:"", passwordRepeat:""
})

const submit = async () => {
  message.value = " "
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

const clearMessage = () => message.value = " "

function redirectToHome() {
    throw new Error('Function not implemented.');
}
</script>

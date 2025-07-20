<template>
  <div class="panel">
    <h1>Sign Up</h1>
    <div style="display: none">
      <Loading :loading="loading" text="loading..."></Loading>
    </div>
    <form _v-show="! loading" :class="{ loading: loading }" @submit.prevent="submit" autocomplete="off">
      <div class="field">
        <label for="email" class="mandatory">Email</label>
        <input
          id="email"
          type="text"
          v-model="formData.email"
          :autocomplete="autocomplete('email')"
          @input="clearMessage"
        />
      </div>
      <div class="field">
        <label for="username"
          >Username <span style="font-size: 80%; color: var(--color-text-disabled)">(optional)</span></label
        >
        <input
          id="username"
          type="text"
          v-model="formData.username"
          :autocomplete="autocomplete('username')"
          @input="clearMessage"
        />
      </div>
      <div class="field">
        <label for="pasword">Password</label>
        <input id="pasword" type="password" v-model="formData.password" autocomplete="off" @input="clearMessage" />
      </div>
      <div class="field">
        <label for="passwordRepeat">Repeat Password</label>
        <input
          id="passwordRepeat"
          type="password"
          v-model="formData.passwordRepeat"
          autocomplete="off"
          @input="clearMessage"
        />
      </div>
      <div class="buttons">
        <VButton kind="Create" text="Create an account" @click="submit">Submit</VButton>
        <VButton kind="Cancel" @click="cancel()" />
      </div>
      <div style="margin-top: 5px">
        <div class="error" :class="{ hidden: message == ' ' }">{{ message }}</div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import UserService, { type SignupInput } from '@/services/User.service'
import { reactive, ref } from 'vue'
import VButton from '../controls/VButton.vue'
import router, { redirectToHome, Routes } from '@/router'
import { autocomplete } from '@/services/Autocomplete'

//const emit = defineEmits(["close"])

const loading = ref(false)
const message = ref<string | null>(' ')

const userService = new UserService()

const formData = reactive({
  email: '',
  username: '',
  password: '',
  passwordRepeat: '',
})

const submit = async () => {
  message.value = ' '
  loading.value = true

  const request: SignupInput = {
    email: formData.email,
    username: formData.username,
    password: formData.password,
    passwordRepeat: formData.passwordRepeat,
  }

  const result = await userService.signup(request)
  loading.value = false

  if (result.isSuccess) {
    router.push({
      name: Routes.SignupEmailVerification,
      query: { email: request.email },
    })
  } else {
    console.error(`Failed to create a new account. ${result.error}`)
    message.value = result.error
  }
}

const cancel = async () => {
  redirectToHome()
}

const clearMessage = () => (message.value = ' ')
</script>

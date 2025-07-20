<template>
  <div class="panel">
    <h1>Email Verification</h1>
    <p>
      An email has been sent to the address <span class="highlight">{{ email }}</span
      >.<br />
      Please click the link in the email to verify your email address or use the form below.
    </p>
    <p>If you did not receive the email, please check your spam folder.</p>

    <div _v-show="showForm">
      <hr style="margin: 20px 0" />
      <Loading :loading="loading" text="loading form"></Loading>
      <form _v-show="! loading" :class="{ loading: loading }" @submit.prevent="submit" autocomplete="off">
        <div class="field">
          <label for="code" class="big-label">Code</label>
          <input type="text" id="code" v-model="formData.code" @input="clearMessage" />
          <VButton type="submit" kind="Generic" style="margin-left: 20px">Verify</VButton>
        </div>

        <div v-if="message" style="margin-top: 5px">
          <div class="error">{{ message }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { reactive, ref } from 'vue'
import VButton from '../controls/VButton.vue'
import AuthService from '@/services/Auth.service'

const email = ref<string | null>(null)
const showForm = ref(false)
const loading = ref(false)
const message = ref<string | null>(null)
const formData = reactive({ code: '' })

const authService = new AuthService()

//Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'code')

email.value = (router.currentRoute.value.query.email as string) || null
if (email.value) {
  showForm.value = true
} else {
  message.value = 'No email address found in the URL.'
}

// let the input form appear after some seconds
setTimeout(() => {
  showForm.value = false
}, 10_000)

const submit = async () => {
  if (!email.value) {
    message.value = 'No email address provided.'
    return
  }

  loading.value = true
  const response = await authService.verifyEmail(email.value, formData.code)
  loading.value = false

  if (response.isSuccess) {
    const isVerified = response.value
    if (isVerified) {
      message.value = 'Email verified successfully!'
      setTimeout(() => {
        router.push({ name: 'Login' })
      }, 3000)
    } else {
      message.value = 'Email verification failed!'
    }
  } else {
    console.error(`Failed to verify email. ${response.error}`)
    message.value = response.error
  }
}

const clearMessage = () => (message.value = null)
</script>

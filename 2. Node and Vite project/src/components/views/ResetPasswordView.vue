<template>
  <div v-show="errorMessage" style="margin-top: 5px">
    <div class="error">{{ errorMessage }}</div>
  </div>

  <div v-show="successMessage" style="margin-top: 5px">
    <div class="success">{{ successMessage }}</div>
  </div>

  <div v-show="showForm">
    <h1>Reset Password</h1>

    <hr style="margin: 20px 0" />
    <Loading :loading="loading" text="loading form"></Loading>
    <form v-show="!loading" :class="{ loading: loading }" @submit.prevent="submit" autocomplete="off">
      <div class="field">
        <label for="password" class="big-label">New password</label>
        <input type="text" id="password" v-model="formData.password" @input="clearMessage" />
      </div>
      <div class="field">
        <label for="password_repeat" class="big-label">Repeat (new) password</label>
        <input type="text" id="password_repeat" v-model="formData.passwordRepeat" @input="clearMessage" />
      </div>

      <VButton type="submit" kind="Generic" style="margin-left: 20px">Verify</VButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import AuthService from '@/services/Auth.service'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const authService = new AuthService()

const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const showForm = ref(false)
const loading = ref(false)
const formData = reactive({ password: '', passwordRepeat: '' })

// you came here from a link in a email
//let email = router.currentRoute.value.query.email as string || "(email not found!)"
let requestCode = route.query[''] as string

if (requestCode) showForm.value = true
else errorMessage.value = 'No request code found in the URL.'

const showError = (message: string) => {
  successMessage.value = null
  errorMessage.value = message
}

let showSuccess = (message: string) => {
  errorMessage.value = null
  successMessage.value = message
}

const clearMessage = () => {
  errorMessage.value = null
  successMessage.value = null
}

let submit = async () => {
  errorMessage.value = null
  successMessage.value = null

  if (formData.password == '' || formData.passwordRepeat == '') {
    errorMessage.value = 'Please fill in both fields.'
    return
  }

  if (formData.password != formData.passwordRepeat) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  loading.value = true
  const result = await authService.resetPassword(requestCode, formData.password)
  loading.value = false

  if (result.isSuccess) {
    showSuccess('Password changed successfully.')
    showForm.value = false
  } else {
    showError(result.error)
  }
}
</script>

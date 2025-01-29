<template>
  <VueFinalModal
    class="modal-container"
    content-class="modal-content panel"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    >
      <h1>Login</h1>
      <XButton @click="emit('close')"></XButton>
      <Loading :loading="loading" text="loading..."></Loading>

      <form v-show="! loading" @submit.prevent="submit">
          <div class="field">
              <label for="user">User</label>
              <input id="user" @input="clearMessage" v-model="loginForm.username" autocomplete="off" />
          </div>
          <div class="field">
              <label for="password">Password</label>
              <input id="password" type="password" @input="clearMessage" v-model="loginForm.password" autocomplete="off" />
          </div>

          <div class="buttons">
              <button type="submit">Login</button>
          </div>

          <div v-show="message" style="margin-top: 5px">
              <div class="error">{{ message }}</div>
          </div>
      </form>

    </VueFinalModal>
</template>

<script setup lang="ts">
import AuthService from '@/services/Auth.service'
import Loading from '@/components/Loading.vue'
import XButton from './XButton.vue'
import { defineEmits, reactive, ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { useUserStore } from '@/stores/UserStore'

const emit = defineEmits(["close", "test"])

const loading = ref(false)
const message = ref<string|null>(null)
//const switchVisibility = () => loading.value = !loading.value

const loginForm = reactive({username:"", password:""})
const authService = new AuthService()

const submit = async () => {
  message.value = null
  loading.value = true
  const result = await authService.login(loginForm.username, loginForm.password)
  loading.value = false

  if (result.isSuccess) {
    emit("close")
  }
  else {
    console.error(`Failed to login. ${result.error}`)
    message.value = result.error
  }
}

const clearMessage = () => message.value = null

</script>

<style>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  min-width: 350px;
  min-height: 300px;
  position: relative;

  background: var(--panel-background);
  padding: var(--panel-padding);
  border: var(--panel-border);
  border-radius: var(--panel-border-radius);
}
.modal-content > * + *{
  margin: 0.5rem 0;
}
.modal-content h1 {
  font-size: 1.375rem;
}
.modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}

.dark .modal-content {
  background: #000;
}

.modal-close-button {
  position: absolute;
  top: 0;
  right: 0;
}

</style>

<style scoped>
.field {
  display: block;
}

input {
  display: block;
  text-align: center;
  width: 100%;
}

label {
  display: block;
  padding: 0 !important;
}

.buttons {
  margin-top: var(--gap-xxl);
}
  .buttons button {
    width: 100%;
    display: block;
  }
</style>

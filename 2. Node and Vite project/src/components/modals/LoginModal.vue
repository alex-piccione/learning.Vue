<template>
  <VueFinalModal
    class="modal-container"
    content-class="modal-content panel"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    @opened="onOpen"
    >
      <h1 class="title">Login</h1>
      <XButton @click="emit('close')"></XButton>
      <Loading :loading="loading" text="loading..."></Loading>

      <form v-show="! loading" @submit.prevent="submit" autocomplete="off">
        <div class="field">
          <label for="user">User</label>
          <input id="user" @input="clearMessage" v-model.trim="loginForm.username" ref="inputUser" :autocomplete="autocomplete('login.user')"  />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" type="password" @input="clearMessage" v-model.trim="loginForm.password" autocomplete="off" />
        </div>

        <button type="submit" class="button-login">Login</button>

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
import { autocomplete } from '@/services/Autocomplete'

const emit = defineEmits(["close", "test"])

const loading = ref(false)
const message = ref<string|null>(null)
//const switchVisibility = () => loading.value = !loading.value

const loginForm = reactive({username:"", password:""})
const authService = new AuthService()

const inputUser = ref<HTMLInputElement|null>(null) // name should match the "ref" property on the element
const onOpen = () => inputUser.value?.focus()  // /*alert(this.$refs.input_user)*/

const submit = async () => {
  message.value = null

  if(loginForm.username == "" || loginForm.password == "") {
    message.value = "Please fill in both fields."
    return
  }

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

//const vFocus = (el: HTMLElement) => {alert(123); el.focus() }

const clearMessage = () => message.value = null

</script>

<style>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.modal-content {
  display: flex;
  flex-direction: column;
  min-width: 350px;
  min-height: 380px;
  position: relative;
  margin-top: 10%;

  background: var(--panel-background);
  padding: var(--panel-padding);
  border: var(--panel-border);
  border-radius: var(--panel-border-radius);

  _box-shadow: rgba(150,150,150, 0.8) 0 -2px 4px;
  box-shadow: rgba(50, 50, 80, 0.7) 0 2px 4px;
}
.modal-content > * + *{
  margin: 0.5rem 0;
}
.modal-content h1.title {
  font-size: 1.3rem;
  text-align: center;
  font-weight: 600;
}
.modal-content button {
  margin: 0.3rem 0 0 auto;
}

.dark .modal-content {
  background: #000;
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

button {
  margin-top: var(--gap-xxl);
  margin-bottom: var(--gap-xxl);
  width: 100%;
  line-height: 3rem;
  display: block;

}
</style>

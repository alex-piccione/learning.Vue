<template>
  <VueFinalModal
    class="modal-container"
    content-class="modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    >
      <h1>Login</h1>
      <a class="modal-close-button" @click="onClose">
        <svg focusable="false" width="2em" height="2em" viewBox="0 0 24 24" data-v-45f29cbe=""><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" fill="currentColor"></path></svg>
      </a>
      <Loading :loading="loading" text="loading..."></Loading>

      <form v-show="! loading" @submit.prevent="submit">
          <div class="field">
              <label for="user">User</label>
              <input id="user" @input="clearMessage" v-model="loginForm.username" />
          </div>
          <div class="field">
              <label for="password">Password</label>
              <input id="password" type="password" @input="clearMessage"  v-model="loginForm.password" />
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
import { useUserStore } from '@/stores/UserStore'
import { defineEmits, reactive, ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits(["close"])

const loading = ref(false)
const message = ref<string|null>(null)

const switchVisibility = () => loading.value = !loading.value

const loginForm = reactive({username:"", password:""})

const userStore = useUserStore()

const authService = new AuthService()

const submit = async () => {
    loading.value = true
    const result = await authService.login(loginForm.username, loginForm.password)
    loading.value = false

    if (result.isSuccess) {
      console.log(`login success. ${userStore.isAuthenticated}`)
      close()
      //emit("close")
    }
    else {
      console.error(`Failed to login. ${result.error}`)
      message.value = result.error
    }
}

const onClose = () => close()

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

a:hover {
  background-color: inherit;
  cursor: pointer;
  text-shadow: 0 0 5px rgba(200, 200, 200, .5);
}
</style>

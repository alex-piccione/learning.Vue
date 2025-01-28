<template>
  <VueFinalModal
    class="modal-container"
    content-class="modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    >
      <h1>Login</h1>
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
          <hr />
          <div class="buttons">
              <button type="submit">Login</button>
              <!--<button type="reset">Reset</button>-->
              <button @click="emit('close')">Close</button>
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

const loading = ref(true)
const message = ref<string|null>(null)

const loginForm = reactive({username:"", password:""})

const userStore = useUserStore()

const authService = new AuthService()

const submit = async () => {
    loading.value = true
    const result = await authService.login(loginForm.username, loginForm.password)
    loading.value = false

    if (result.isSuccess) {
      console.log(`login success. ${userStore.isAuthenticated}`)
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
    min-width: 400px;

    background: var(--panel-background);
    _background: red;
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
</style>

<style scoped>
input {
    text-align: center;
}

label {
  display: block;
}

.buttons button {
  width: 100%;
  display: block;
}
</style>

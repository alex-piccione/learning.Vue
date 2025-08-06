<template>
  <header>
    <img alt="Logo" class="logo" src="@/assets/images/logo.svg" width="350px" />
    <div class="wrapper">
      <UserState @login="openLoginModal"></UserState>
      <nav class="panel" v-if="userStore.isAuthenticated">
        <RouterLink to="/">Home</RouterLink>
        <!--
        <RouterLink to="/signup" v-if="!userStore.isAuthenticated">Sign Up</RouterLink>
        <RouterLink to="" v-if="!userStore.isAuthenticated" @click="openLoginModal">Login</RouterLink>
        -->
        <!--<RouterLink to="/about">About</RouterLink>-->
        <RouterLink to="/categories">Categories</RouterLink>
      </nav>
    </div>
  </header>

  <div class="page">
    <RouterView />
  </div>

  <div class="app-version">
    <span
      >UI version: <span :class="ui_version ? 'highlight' : 'error'">{{ ui_version }}</span></span
    >
    <span
      >API version: <span :class="api_version ? 'highlight' : 'error'">{{ api_version }}</span></span
    >
  </div>

  <LoginModal></LoginModal>
  <PasswordForgotModal></PasswordForgotModal>
  <!--<PopupModal kind="Info"></PopupModal>-->
  <ModalsContainer />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'
import { getInfo } from '../services/API/api'
import { useUserStore } from '../stores/UserStore'
import { useCategoryDataStore } from '../stores/CategoryDataStore'
import AuthService from '../services/Auth.service'
import { ModalsContainer, useModal } from 'vue-final-modal'
import PopupModal from './modals/PopupModal.vue'
import LoginModal from './modals/LoginModal.vue'
import PasswordForgotModal from './modals/PasswordForgotModal.vue'
import UserState from './UserState.vue'
import { debug } from '@/utils'
import configuration from '@/configuration'
import { useApiInfoStore } from '@/stores/ApiInfoStore_old'

const authService = new AuthService()
const apiInfoStore = useApiInfoStore()
const userStore = useUserStore()
//const categoryDataStore = useCategoryDataStore()

const ui_version = import.meta.env.VITE_UI_VERSION
const api_version = ref<string>('loading')

if (configuration.debug === false) console.log('configuration.debug is set to false')

onMounted(() => {
  debug('App - onMounted')

  api_version.value = apiInfoStore.version

  initialize()

  checkAuthentication()
})

const initialize = () => {
  debug('App - initialize')
  authService.checkExistingSession('onMounted').then((result) => {
    if (result.isSuccess) {
      // put initialization logic here
    } else {
      console.error(`Failed to check authentication. ${result.error}`)
      // logout user if check fails for many times
      //userStore.logout()
      //setTimeout(initialize, 2_000)
      return
    }
  })
}

// Check authentication every N seconds to intercept login/logout from other tabs
const checkAuthentication = () => {
  debug('App - checkAuthentication')
  authService.checkExistingSession('App checkAuthentication').then((result) => {
    if (result.isSuccess) {
      setTimeout(checkAuthentication, 10_000 * 10)
    } else {
      console.error(`Failed to check authentication. ${result.error}`)
      // logout user if check fails for many times
      //userStore.logout()
      //setTimeout(checkAuthentication, 2_000 * 10)
      return
    }
  })
}

const loginModal = useModal({
  component: LoginModal,
  attrs: {
    onClose(data: any) {
      closeLoginModal(data)
    },
  },
})

const openLoginModal = () => loginModal.open()
const closeLoginModal = (data: any) => {
  loginModal.close()
  data === 'forgot-password' && passwordForgotModal.open()
}

const passwordForgotModal = useModal({
  component: PasswordForgotModal,
  attrs: {
    onClose(data: any) {
      closePasswordForgotModal(data)
    },
  },
})

const closePasswordForgotModal = (data: any) => passwordForgotModal.close()
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text-highlight);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-text);
}

nav a:first-of-type {
  border: 0;
}

.app-version {
  position: block;
  margin-top: var(--gap);
  text-align: center;
}

@media (min-width: 1024px) {
  header {
    /*display: flex;*/
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    /*margin-left: -1rem;*/
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }

  .app-version {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
}
</style>

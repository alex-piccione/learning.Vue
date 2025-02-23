<template>
  <header>
    <img alt="Logo" class="logo" src="@/assets/images/logo.svg" width="400px"  />
    <div class="wrapper">
      <UserState></UserState>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <!--<RouterLink to="/login" v-if="!userStore.isAuthenticated">Login page</RouterLink>-->

        <RouterLink to="/signup" v-if="!userStore.isAuthenticated">Sign Up</RouterLink>
        <RouterLink to="" v-if="!userStore.isAuthenticated">
          <a @click="openLoginModal">Login</a>
        </RouterLink>
        <template v-if="userStore.isAuthenticated">

          <!--<RouterLink to="/about">About</RouterLink>-->
          <RouterLink to="/categories">Categories</RouterLink>
      </template>
      </nav>
    </div>
  </header>

  <div class="page">
    <RouterView />
  </div>

  <div class="app-version">
    <span>UI version: <span :class="ui_version ? 'highlight' : 'error'">{{ ui_version }}</span></span>
    <span>API version: <span :class="api_version ? 'highlight' : 'error'">{{ api_version }}</span></span>
  </div>

  <LoginModal></LoginModal>
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
import UserState from './UserState.vue'
import { debug } from '@/utils'

const authService = new AuthService()
const userStore = useUserStore()
const categoryDataStore = useCategoryDataStore()

const ui_version = import.meta.env.VITE_UI_VERSION
const api_version = ref<string>("loading")

onMounted(() => {
  console.log("App.vue - onMounted")
  getInfo()
    .then(info => api_version.value = info.version)
    .catch(err => {
      api_version.value = "unknown"
      console.error(`Failed to get API Info. ${err}`)
    })

  initialize()
})

const initialize = () => {
  // Refresh the page or load the page in another browser tab
  debug("App.vue - initialize", userStore.isAuthenticated)
  authService.checkAuthentication("onMounted").then(
    result => {
      if(result.isSuccess) {
        debug("App.vue - userStore.isAuthenticated", userStore.isAuthenticated)

        if(userStore.isAuthenticated)
        {
          /*categoryDataStore.load().then((result) => {
            if(result.isSuccess) {
              console.log("CategoriesData loaded")
            }
            else {
              console.error(`Failed to load categories. ${result.error}`)
            }
          })*/
        }
      }
      else {
        console.error(`Failed to check authentication. ${result.error}`)
        userStore.logout()
        setTimeout(initialize, 1_000)
        return;
      }
    }
  )

  setTimeout(initialize, 10_000)
}

const loginModal = useModal({
  component: LoginModal,
  attrs: {
    onClose() { closeLoginModal()},
  },
  /*slots: {
      default: '<p>UseModal: The content of the modal</p>',
  },*/
})

const openLoginModal = () => loginModal.open()
const closeLoginModal = () => loginModal.close()


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
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
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
    margin-left: -1rem;
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

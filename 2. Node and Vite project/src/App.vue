<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted, reactive, watch } from 'vue'
import { getInfo } from './services/API/api';
import { useUserStore } from './stores/UserStore';
import AuthService from './services/Auth.service';


const authService = new AuthService()
const userStore = useUserStore()

//const authService = reactive ()
const isAuthenticated = ref(userStore.isAuthenticated)
const username = ref(userStore.username)

//import { storeToRefs } from "pinia"
const version = ref<string>("loading")

onMounted(() => {
  getInfo()
    .then(info => version.value = info.version)
    .catch(err => {
      version.value = "unknown"
      console.error(`Failed to get API Info. ${err}`)
    })
})

/*
watch(() => authService.Username, async (oldValue, newValue) => {
  isAuthenticated.value = newValue !== undefined
})*/

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/images/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <div>API version: <span :class="version != 'unknown' ? 'green' : 'error'">{{ version }}</span></div>

      <div>User: {{ username }}</div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login" v-if="!isAuthenticated">Login</RouterLink>
        <RouterLink to="" v-if="isAuthenticated" :custom="true">
          <a @click="authService.logout">Logout</a>
          </RouterLink>
        <RouterLink to="/signup">Sign Up</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/counter">Counter</RouterLink>
        <RouterLink to="/categories">Categories</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

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

@media (min-width: 1024px) {
  header {
    display: flex;
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
}
</style>

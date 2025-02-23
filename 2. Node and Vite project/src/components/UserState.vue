<template>
  <div class="panel" style="width:100%">
    <template v-if="userStore.isAuthenticated">
      <div>Hello {{ userStore.username }}
        <RouterLink to="" v-if="userStore.isAuthenticated" :custom="true" style="position: absolute; right: 0; top: 0;">
        <a @click="authService.logout" class="clickable">(logout)</a>
        </RouterLink>
      </div>
    </template>
    <template v-else>
    <div>
      <RouterLink to="/signup">Sign up</RouterLink> to create an account<br />
    </div>
    <div style="margin-left: var(--gap);">or</div>
    <div>
    <RouterLink to="" v-if="!userStore.isAuthenticated" @click="emit('login')">Log in</RouterLink> if you already have one
    </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import AuthService from '@/services/Auth.service';
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()
const authService = new AuthService()


const emit = defineEmits(["login"])

</script>

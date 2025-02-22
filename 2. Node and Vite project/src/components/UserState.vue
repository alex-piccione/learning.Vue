<template>
  <div class="box">
    <template v-if="userStore.isAuthenticated">
      <div>Hello {{ userStore.username }}
        <RouterLink to="" v-if="userStore.isAuthenticated" :custom="true">
          <a @click="authService.logout" class="clickable">(logout)</a>
        </RouterLink>
      </div>
    </template>
    <template v-else>
    <div>Please Sign Up to create a user or Login if you already have one.</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import AuthService from '@/services/Auth.service';
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()
const authService = new AuthService()

</script>

<style scoped>
.box {
  margin-bottom: solid 1px #777;
}
</style>

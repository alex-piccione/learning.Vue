<template>
  <div class="box">
    <template v-if="isAuthenticated">
      <div>Hello {{ userStore.username }}</div>
    </template>
    <template v-else>
    <div>NOT isAuthenticated</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue';

const userStore = useUserStore()
const isAuthenticated = ref(userStore.isAuthenticated)

</script>

<style scoped>
.box {
  margin-bottom: solid 1px #777;
}

</style>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Проверяем, если пользователь обновляет страницу
if (window.performance.navigation.type === 1) {
  // Перебрасываем пользователя на главную страницу
  router.push('/')
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

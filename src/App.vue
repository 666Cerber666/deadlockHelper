<script>

export default {
  created() {
    // Проверяем, если пользователь обновляет страницу
    if (window.performance.navigation.type === 1) {
      // Перебрасываем пользователя на главную страницу
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" />
    </transition>
</router-view>
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

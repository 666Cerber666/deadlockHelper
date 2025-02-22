<template>
    <div class="wrapper">
      <div class="home">
        <h2 class="text-teal-300"><img src="../assets/logo/logo.png"></h2>
        <div class="menu w-full">
          <button @click="goToCharacters">Персонажи</button>
          <button @click="goToItems">Предметы</button>
          <button @click="goToAssembles">Сборки</button>
          <button @click="goToFavorites">Избранное</button>
        </div>
        <button @click="goToLogin">Авторизоваться</button>
      </div>
    </div>
  </template>
  
  <script>
export default {
  methods: {
    goToCharacters() {
      this.$router.push('/characters');
    },
    goToItems() {
      this.$router.push('/items');
    },
    goToAssembles() {
      this.$router.push('/Assembles');
    },
    goToFavorites() {
      this.$router.push('/favorites');
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>
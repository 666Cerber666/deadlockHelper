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
        <div v-if="auth_token">
          <div class="text-center">
            {{ user.username }}
          </div>
          <br>
          <span @click="logout" class="cursor-pointer hover:text-red-500 transition">Выйти из аккаунта</span>
        </div>
        <span v-else @click="goToLogin" class="cursor-pointer hover:text-red-500 transition">Авторизация</span>
      </div>
    </div>
  </template>
  
  <script>
    import axios from 'axios';

export default {
  data(){
    return{
      auth_token: localStorage.getItem('auth_token'),
      user: {}
    }
  },
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
    },
    logout(){
      axios.post('https://api.deadlock-helper.selfdoor.ru/auth/token/logout/', {}, {
        headers: {
          Authorization: `Token ${localStorage.getItem('auth_token')}`
        }
      }).then(response =>{
        console.log(response.data);
        localStorage.removeItem('auth_token');
        window.location.reload();
      }).catch(error => {
        console.error(error);
        localStorage.removeItem('auth_token');
        window.location.reload();
      })
    },
    infoAccount(){
      axios.get('https://api.deadlock-helper.selfdoor.ru/auth/users/me/', {
        headers: {
          Authorization: `Token ${this.auth_token}`
        }
      }).then(response =>{
        this.user = response.data
      })
    }
  },
  mounted(){
    if(this.auth_token){
      this.infoAccount();
    } 
  }
}
</script>
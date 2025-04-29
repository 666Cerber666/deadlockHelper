<template>
  <div class="wrapper">
    <transition name="fade">
      <Notification @click="error = null" v-if="showError" :error="error" />
    </transition>
    <Header/>
    <div class="flex flex-col items-center justify-center h-screen">
        <form class="flex flex-col items-center gap-4" @submit.prevent="login">
            <span class="flex flex-col gap-2">
                Логин:
                <input class="rounded-xl p-2 bg-white text-black border-white" v-model="loginData.username" type="text">
            </span>
            <span class="flex flex-col gap-2">
                Пароль:
                <input class="rounded-xl p-2 bg-white text-black border-white" v-model="loginData.password" type="password">
            </span>
            <button type="submit">Войти</button>
            <span @click="GoToRegister" class="cursor-pointer hover:text-red-500 transition">Создать аккаунт</span>
        </form>
    </div>
  </div>
</template>

<script>
import Notification from '../../components/Notification.vue';
import Header from '../../components/Header.vue'
import axios from 'axios';

export default {
    components:{
        Header,
        Notification
    },
    data() {
    return {
      loginData: {
        username: '',
        password: ''
      },
      error: null,
      showError: false
    }
  },
    methods:{
        GoToRegister(){
            this.$router.push("/register")
        },
        login() {
          const errorMessages = {
            "Unable to log in with provided credentials": "Не удается войти в систему с предоставленными учетными данными.",
            "Invalid username/password": "Неправильный логин или пароль",
            "User  not found": "Пользователь не найден",
          };
          axios.post('https://api.deadlock-helper.selfdoor.ru/auth/token/login/', this.loginData)
              .then(response => {
                const token = response.data.auth_token;
                localStorage.setItem('auth_token', token);
                // Перенаправление на защищенную страницу
                this.$router.push('/');
              })
              .catch(error => {
                console.error(error);
                if (error.response.status === 404) {
                  router.push({ name: 'not-found' });
                } else if (error.response.status === 400) {
                    this.error = "Не удается войти в систему с предоставленными учетными данными.";
                    this.showError = true;
                      setTimeout(() => {
                        this.showError = false;
                      }, 3000);
                  } else {
                    this.error = "Произошла ошибка";
                    this.showError = true;
                      setTimeout(() => {
                        this.showError = false;
                      }, 3000);
                  }
              });
            }
    }
}
</script>

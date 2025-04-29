<template>
  <div class="wrapper">
    <Header/>
    <div class="flex flex-col items-center justify-center h-screen">
      <form class="flex flex-col items-center gap-4" @submit.prevent="register">
        <span class="flex flex-col gap-2">
          Логин:
          <input class="rounded-xl p-2 bg-white text-black border-white" v-model="registerData.username" type="text" @blur="validateUsername" required>
          <div v-if="usernameError" class="error">{{ usernameError }}</div>
        </span>
        <span class="flex flex-col gap-2">
          Почта:
          <input class="rounded-xl p-2 bg-white text-black border-white" v-model="registerData.email" type="email" @blur="validateEmail" required>
          <div v-if="emailError" class="error">{{ emailError }}</div>
        </span>
        <span class="flex flex-col gap-2">
          Пароль:
          <input class="rounded-xl p-2 bg-white text-black border-white" v-model="registerData.password" type="password" @blur="validatePassword" required>
          <div v-if="passwordError" class="error">{{ passwordError }}</div>
        </span>
        <span class="flex flex-col gap-2">
          Повтор пароля:
          <input class="rounded-xl p-2 bg-white text-black border-white" v-model="registerData.repeat_password" type="password" @blur="validateRepeatPassword" required>
          <div v-if="repeatPasswordError" class="error">{{ repeatPasswordError }}</div>
        </span>
        <button type="submit" :disabled="!isValidForm">Создать аккаунт</button>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import Header from '../../components/Header.vue';
  import axios from 'axios';
  
  export default {
      components:{
          Header
      },
      data() {
    return {
      token:"",
      registerData: {
        username: '',
        email: '',
        password: '',
        repeat_password: '',
      },
      usernameError: '',
      emailError: '',
      passwordError: '',
      repeatPasswordError: '',
    }
  },
  computed: {
    isValidForm() {
      return !this.usernameError && !this.emailError && !this.passwordError && !this.repeatPasswordError && this.passwordsMatch
    },
    passwordsMatch() {
      return this.registerData.password === this.registerData.repeat_password
    }
  },
    methods:{
      register() {
          axios.post('https://api.deadlock-helper.selfdoor.ru/auth/users/', this.registerData)
            .then(response => {
              this.loginAfterRegister();
            })
            .catch(error => {
              console.error(error);
              if (error.response.status === 404) {
                router.push({ name: 'not-found' });
              } else {
                this.error = error.response.data;
              }
            });
        },

            loginAfterRegister() {
              axios.post('https://api.deadlock-helper.selfdoor.ru/auth/token/login/', {
                username: this.registerData.username,
                password: this.registerData.password
              })
                .then(response => {
                  const token = response.data.auth_token;
                  localStorage.setItem('auth_token', token);
                  this.$router.push('/');
                })
                .catch(error => {
                  console.error(error);
                });
            },
            validateUsername() {
              if (this.registerData.username.length < 3) {
                this.usernameError = 'Логин должен быть не менее 3 символов'
              } else {
                this.usernameError = ''
              }
            },
            validateEmail() {
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              if (!emailRegex.test(this.registerData.email)) {
                this.emailError = 'Некорректный email'
              } else {
                this.emailError = ''
              }
            },
            validatePassword() {
              if (this.registerData.password.length < 8) {
                this.passwordError = 'Пароль должен быть не менее 8 символов'
              } else if (this.registerData.password === this.registerData.username) {
                this.passwordError = 'Пароль не должен совпадать с логином'
              } else {
                this.passwordError = ''
              }
            },
            validateRepeatPassword() {
              if (this.registerData.repeat_password !== this.registerData.password) {
                this.repeatPasswordError = 'Пароли не совпадают'
              } else {
                this.repeatPasswordError = ''
              }
            }
          }
        }
  </script>
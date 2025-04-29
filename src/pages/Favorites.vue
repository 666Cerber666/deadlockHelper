<template>
    <div v-if="crafts" class="wrapper">
      <transition name="fade">
        <Notification @click="error = null" v-if="showError" :error="error" />
      </transition>
      <div class="flex flex-row justify-around items-center px-2">
        <Header/>
      </div>


      <div class="flex flex-col items-center gap-4 p-2">

        <div class="flex flex-row gap-4 w-full md:w-1/2 p-2">
          <div class="card rounded-xl w-full text-center" @click="Favorite = true ; MyAss = false">избранное</div>
          <div class="card rounded-xl w-full text-center" @click="MyAss = true; Favorite = false">мои сборки</div>
        </div>

        <div class="relative w-full">
        
      <transition name="favorite" appear>

        <div v-if="Favorite" class="flex flex-col items-center w-full gap-4 p-2 absolute top-0" id="assembles-list">
          
          <div v-for="(craft, index) in crafts" :key="index" class="flex card max-w-2xl w-full flex-row h-30 items-center justify-around gap-14 rounded-xl" @click="goToAssemblesCard(craft)">
            <div class="text-2xl text-center">{{ craft.name }}<p class="text-xl">создатель: {{ craft.author }}</p></div>
            <div v-if="!craft.isFavorite" class="hearth w-12 h-12" @click.stop="addAssemblesFavorite(craft)"></div>
            <div v-else>
              <div class="hearth_red w-12 h-12" @click.stop="removeFromFavorites(craft)"></div>
            </div>
          </div>

        </div>

      </transition>

      <transition name="ass" mode="out-in">

        <div v-if="MyAss" class="flex flex-col items-center w-full gap-4 p-2 absolute top-0" id="assembles-list">
          
          <div v-for="(mycraft, index) in mycrafts" :key="index" class="flex card max-w-2xl w-full flex-row h-30 items-center justify-around gap-14 rounded-xl" @click="goToAssemblesCard(mycraft)">
            <div class="text-2xl text-center">{{ mycraft.name }}<p class="text-xl">создатель: {{ mycraft.author }}</p></div>
          </div>
          
        </div>

      </transition>

      </div>

      </div>
   
    </div>
    <Loader v-else />
  </template>
  
  <script>
  import Notification from '../components/Notification.vue';
  import Header from '../components/Header.vue';
  import Loader from '../components/Loader.vue';
  import axios from 'axios';

  export default {
    components: { Header, Loader, Notification },
    data() {
    return {
      crafts: [
       
      ],
      mycrafts:[

      ],
      error:null,
      showError: false,
      Favorite:true,
      MyAss:false,
    }
  },
    methods: {
      goToHome() {
        this.$router.push('/');
      },
      goToAssemblesCard(craft) {
        this.$router.push({ name: 'AssemblesCard', params: { id: craft.id }, query: {name: craft.name, author: craft.author} });
      },
      goToAssemblesCard(mycraft) {
        this.$router.push({ name: 'AssemblesCard', params: { id: mycraft.id }, query: {name: mycraft.name, author: mycraft.author} });
      },
      myAssemblesList(){
        axios.get('https://api.deadlock-helper.selfdoor.ru/auth/users/me/crafts/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`
          }
        })
          .then(response => {
            this.mycrafts = response.data.map(mycraft => {
              return {
                ...mycraft,
                isFavorite: true
              };
            });
          })
          .catch(error => {
            if (error.response.status === 404) {
              router.push({ name: 'not-found' });
            } else if (error.response.status === 401){
              this.error = 'Войдите в аккаунт, чтобы увидеть список';
              this.showError = true;
                setTimeout(() => {
                  this.showError = false;
                }, 3000);
            };
          });
      },
      addAssemblesFavorite(craft) {
        const auth_token = localStorage.getItem('auth_token');
        axios.post('https://api.deadlock-helper.selfdoor.ru/favorites/', {
          craft_id: craft.id
        }, {
          headers: {
            'Authorization': `Token ${auth_token}`
          }
        })
          .then(response => {
            console.log(response);
            craft.isFavorite = true;
          })
          .catch(error => {
            console.error(error);
          });
      },
      removeFromFavorites(craft) {
          const auth_token = localStorage.getItem('auth_token');
          axios.delete(`https://api.deadlock-helper.selfdoor.ru/favorites/`, {
              headers: {
                  'Authorization': `Token ${auth_token}`
              },
              data: { craft_id: craft.id }
          })
          .then(response => {
              craft.isFavorite = false;
          })
          .catch(error => {
              console.error(error);
          });
      },
      favoritesList(){
        axios.get('https://api.deadlock-helper.selfdoor.ru/favorites/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`
          }
        })
          .then(response => {
            this.crafts = response.data.map(craft => {
              return {
                ...craft,
                isFavorite: true
              };
            });
          })
          .catch(error => {
            if (error.response.status === 404) {
              router.push({ name: 'not-found' });
            } else if (error.response.status === 401){
              this.error = 'Войдите в аккаунт, чтобы увидеть список';
              this.showError = true;
                setTimeout(() => {
                  this.showError = false;
                }, 3000);
            };
          });
      }
    },
    created(){
      this.favoritesList();
      this.myAssemblesList();
    }
  }
  </script>
  
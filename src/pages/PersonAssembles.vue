<template>
  <div v-if="crafts" class="wrapper">
    <transition name="fade">
      <Notification @click="error = null" v-if="showError" :error="error" />
    </transition>
    <div class="flex flex-row justify-around items-center px-2">
      <Header/>
    </div>
    <div class="flex flex-col items-center gap-4 p-2">

      <div class="flex flex-col items-center gap-4 p-2" id="assembles-list">
        
        <div v-for="(craft, index) in crafts" :key="index" class="flex card max-w-2xl w-full flex-row h-30 items-center justify-around gap-14 rounded-xl" @click="goToAssemblesCard(craft)">
          <div class="text-2xl text-center">{{ craft.name }}<p class="text-xl">создатель: {{ craft.author }}</p></div>
          <div v-if="craft.isFavorite" class="hearth_red w-12 h-12" @click.stop="removeFromFavorites(craft)"></div>
          <div v-else class="hearth w-12 h-12" @click.stop="addAssemblesFavorite(craft)"></div>
        </div>
      </div>
    </div>

    <div class="flex items-center flex-col"> 
      <button class="h-16 text-center pt-5" @click="goToAddAssembles">Создать сборку</button>
    </div>
  </div>
  <Loader v-else/>
</template>

<script>
import Notification from '../components/Notification.vue';
import Header from '../components/Header.vue'
import Loader from '../components/Loader.vue'
import axios from 'axios';

export default {
  components: { Header, Loader, Notification },
  data() {
    return {
      character: this.$route.params.id,
      crafts: [
       
      ],
      error: null,
      showError: false
    }
  },
  methods: {
    craftsList(){
      axios.get(`https://api.deadlock-helper.selfdoor.ru/crafts/?character=${this.$route.params.id}`)
        .then(response => {
          axios.get('https://api.deadlock-helper.selfdoor.ru/favorites', {
            headers: {
              Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
          })
            .then(favoriteResponse => {
              const favoriteCraftIds = favoriteResponse.data.map(craft => craft.id);
              response.data.forEach(craft => {
                if (favoriteCraftIds.includes(craft.id)) {
                  craft.isFavorite = true;
                } else {
                  craft.isFavorite = false;
                }
              });
              this.crafts = response.data;
            })
            .catch(error => {
              if (error.response.status === 401) {
                this.crafts = response.data;
                this.error = 'Чтобы увидеть список избранных сборок, пожалуйста, войдите в аккаунт';
                this.showError = true;
                  setTimeout(() => {
                    this.showError = false;
                  }, 3000);
              }
              else{this.error = error.response.data;}
            });
        })
        .catch(error => {
          this.error = error.response.data;
          this.showError = true;
            setTimeout(() => {
              this.showError = false;
            }, 3000);
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
          craft.isFavorite = true;
        })
        .catch(error => {
              if (error.response.status === 401) {
                this.error = 'Чтобы добавить сборку в избранное, пожалуйста, войдите в аккаунт';
                this.showError = true;
                  setTimeout(() => {
                    this.showError = false;
                  }, 3000);
              }
              else{this.error = error.response.data;}
            });
    },
    goToHome() {
      this.$router.push('/');
    },
    goToAssemblesCard(craft) {
      this.$router.push({ name: 'AssemblesCard', params: { id: craft.id }, query: {name: craft.name, author: craft.author} });
    },
    goToAddAssembles(){
      this.$router.push({ name: 'AssemblesCreate', params: { id: this.character } });
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
              if (error.response.status === 404) {
                router.push({ name: 'not-found' });
              } else if (error.response.status === 401) {
                this.error = 'Чтобы удалить сборку из избранных, пожалуйста, войдите в аккаунт';
              }
              else{this.error = error.response.data;}
          });
      }
  },
  computed: {
  favoriteCrafts() {
    return this.crafts.filter(craft => craft.isFavorite);
  }
},
  mounted() {
    if (this.$route.params.id) {
      this.craftsList();
    } else {
      console.log('Параметр id не найден в URL');
    }
  }

}
</script>

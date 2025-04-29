<template>
    <div v-if="item" class="wrapper">
      <div class="h-48 flex flex-col px-4">
          <Header/>
          <div class="flex flex-row h-full items-center justify-evenly mt-4"><div class="person_icon rounded-xl mt-2"><img class="character_icon w-24 h-24 rounded-xl" :src="item.image_url" /></div><div class="text-2xl">{{item.name}}</div></div>
      </div>
      <div class="text-left p-4 mt-10">
          <h2 class="text-2xl">Описание предмета:</h2>
          <p>{{ item.description }}</p>
          <br>

          <h2 class="text-2xl">Характеристики:</h2>
          <p>{{ item.features }}</p>

          <br>

          <h2 class="text-2xl">Рекомендация:</h2>
          <p>{{ item.recommendations }}</p>

      </div>
    </div>
    <Loader v-else />
  </template>
  
  <script>
  import Header from '../components/Header.vue'
  import Loader from '../components/Loader.vue'
  import axios from 'axios'
  
  export default {
      components:{
          Header, Loader
      },
      data() {
        return {
          skills: [
           
          ],
          item: {}
        }
      },
      methods:{
          GoToBack(){
              this.$router.push('/items');
          },
          PersonData(){
            axios.get(`https://api.deadlock-helper.selfdoor.ru/items/${this.$route.params.id}`)
                  .then(response => {
                    this.item = response.data
                  })
                  .catch(error => {
                  console.error(error);
                  // Обработка ошибки
                  if (error.response.status === 404) {
                    router.push({ name: 'not-found' });
                  } else {this.error = error.response.data;}
                  });
          }
      },
      created() {
      if (this.$route.params.id) {
        this.PersonData();
      } else {
        console.log('Параметр id не найден в URL');
      }
    }
  }
  </script>

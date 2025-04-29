<template>
    <div class="wrapper">
        <Header/>
        <div v-if="craft" class="p-4">
            <div class="flex flex-col text-center gap-4 pb-4">
              <template v-for="(category, index) in craft.categories" :key="index">
                <div class="p-4 bg-(--background-card-color) rounded-xl w-2/3"><h2>{{ category.name }}</h2></div>
                <div class="flex flex-row gap-2 mt-4 overflow-auto">
                  <div v-for="(item, itemIndex) in category.items" :key="itemIndex" class="flex flex-col items-center border border-teal-600 h-60 min-w-28 overflow-hidden text-ellipsis">
                    <div class="item_icon rounded-full min-h-20"><img class="item_icon rounded-full" :src="item.image_url" /></div>
                    <div class="h-10 w-full border-t border-orange-300">{{ item.name }}</div>
                  </div>
                </div>
              </template>
            </div>
        </div>
        <Loader v-else />
        </div>
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
      craft: {
        categories: [
          {
            name: '',
            items: []
          },
          {
            name: '',
            items: []
          },
          {
            name: '',
            items: []
          }
        ]
      }
    }
    },
    methods:{
      getCraftData(){
        axios.get(`https://api.deadlock-helper.selfdoor.ru/crafts/${this.$route.params.id}`)
            .then(response => {
              this.craft = response.data;
              console.log(this.craft);
            })
            .catch(error => {
              console.error(error);
              if (error.response.status === 404) {
                router.push({ name: 'not-found' });
              } else {this.error = error.response.data;}
            });
        }  
      },
  mounted() {
    this.getCraftData()
}
}
  </script>
  
  <style>
  .skill_ico{
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      background-image: url('../assets/person_icons/abrams/skills/1-skill.png');
  }
  </style>
<template>
  <div class="wrapper">
    <Header />
    <div v-if="characters" class="flex flex-col gap-4 p-4">
      <Searcher :filterFunction="filterCharacters" @search="searchItems"/>
        <transition-group name="fade" tag="div" class="flex flex-col gap-2">
          <template v-for="(character, index) in filteredCharacters" :key="index">
            <div class="card rounded-xl px-2">
              <div class="flex flex-row h-30 items-center gap-14 transition duration-700 hover:border hover:border-yellow-400" @click="goToAssemblesCharacter(character)">
                <div class="character_icon rounded-xl">
                  <img class="character_icon w-24 h-24 rounded-md" :src="character.image_url" />
                </div>
                <div class="flex flex-col">
                  <div class="text-2xl">{{ character.name }}</div>
                </div>
              </div>
            </div>
          </template>
        </transition-group>
      </div>
    <Loader v-else />
  </div>
</template>

<script>
import Searcher from '../components/Searcher.vue';
import Header from '../components/Header.vue';
import Loader from '../components/Loader.vue';
import axios from 'axios';

export default {
  components: { Header, Loader, Searcher },
  data() {
  return {
    characters: [
     
    ],
    searchQuery: ''
  }
},
  computed: {
    filteredCharacters() {
      if (this.searchQuery === '') {
        return this.characters;
      } else {
        return this.characters.filter(item => this.filterCharacters(item, this.searchQuery))
      }
    }
  },
  methods: {
    filterCharacters(item, searchQuery) {
      if (typeof searchQuery !== 'string') return true;
    return item.name.toLowerCase().includes(searchQuery.toLowerCase())
    },
    searchItems(searchQuery) {
      if (typeof searchQuery !== 'string') return;
      this.searchQuery = searchQuery
    },
    charactersList(){
      axios.get('https://api.deadlock-helper.selfdoor.ru/characters/')
              .then(response => {
                this.characters = response.data
              })
              .catch(error => {
              console.error(error);
              // Обработка ошибки
              if (error.response.status === 404) {
                  router.push({ name: 'not-found' });
                } else {this.error = error.response.data;}
              });
    },
    goToBack() {
      this.$router.push('/');
    },
    goToAssemblesCharacter(character) {
      this.$router.push({ name: 'PersonAssembles', params: { id: character.id }, query: { name: character.name } });
    },
  },
  created(){
    this.charactersList()
  }
}
</script>
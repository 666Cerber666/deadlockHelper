<template>
  <transition name="fade" appear>
  <div v-if="items && categories" class="wrapper">
    <div class="flex flex-row items-center">
      <Header />
    </div>

    <div class="flex flex-col gap-4 p-4">

      <div class="flex flex-col gap-1">

        <div class="grid grid-cols-2 col-auto gap-1 w-full">
          <div v-for="(category, index) in categories" :key="index" class="grid-item text-center card-filter bg-(--background-card-color) w-full rounded-xl" :class="{ 'bg-red-500': filterCategory === category.id }" @click="filterCategory = filterCategory === category.id ? '' : category.id">{{ category.name }}</div>
        </div>
      
      </div>
      


      <div class="flex flex-row gap-1">
        <div class="text-center card-filter bg-(--background-card-color) w-full rounded-xl" :class="{ 'bg-red-500': filterCost === '500' }" @click="filterCost = filterCost === '500' ? '' : '500'">500</div>
        <div class="text-center card-filter bg-(--background-card-color) w-full rounded-xl" :class="{ 'bg-red-500': filterCost === '1250' }" @click="filterCost = filterCost === '1250' ? '' : '1250'">1250</div>
        <div class="text-center card-filter bg-(--background-card-color) w-full rounded-xl" :class="{ 'bg-red-500': filterCost === '3000' }" @click="filterCost = filterCost === '3000' ? '' : '3000'">3000</div>
        <div class="text-center card-filter bg-(--background-card-color) w-full rounded-xl" :class="{ 'bg-red-500': filterCost === '6000+' }" @click="filterCost = filterCost === '6000+' ? '' : '6000+'">6000+</div>
      </div>

      </div>

      <div class="flex flex-col gap-4 p-4">
        <Searcher :filterFunction="filterItems" @search="searchItems"/>
        <transition-group name="fade" tag="div" class="flex flex-col gap-2">
          <template v-for="(item, index) in filteredItems" :key="index">
            <div class="card rounded-xl px-2" @click="goToItemCard(item)">
              <div class="flex flex-row h-full items-center gap-14 transition duration-700 hover:border hover:border-yellow-400">
                <div class="item_icon rounded-xl">
                  <img class="w-24 h-24 rounded-md character_icon" :src="item.image_url" />
                </div>
                <div class="flex flex-col">
                  <div class="text-2xl">{{ item.name }}</div>
                  <div class="text-2xl">{{ item.rus_name }}</div>
                </div>
              </div>
            </div>
          </template>
        </transition-group>
      </div>
    </div>
    <Loader v-else />
  </transition>
</template>

<script>
import Header from '../components/Header.vue';
import Searcher from '../components/Searcher.vue';
import Loader from '../components/Loader.vue';
import axios from 'axios';

export default {
  components: { Header, Loader, Searcher },
  data() {
    return {
      items:[

      ],
      categories:[],
      filterType: '',
      filterCategory:'',
      filterCost: '',
      searchQuery: ''
    }
  },
  computed: {
    filteredItems() {
    return this.items.filter(item => this.filterItems(item, this.searchQuery));
  }
},
  methods: {
    searchItems(searchQuery) {
      this.searchQuery = searchQuery;
    },
    goToItemCard(item){
      this.$router.push({ name: 'ItemCard', params: { id: item.id } });
    },
    goToBack() {
      this.$router.push('/');
    },
    itemsList(){
      axios.get('https://api.deadlock-helper.selfdoor.ru/items/')
                .then(response => {
                console.log(response.data);
                  this.items = response.data;
                  this.filteredItems = response.data;
                })
                .catch(error => {
                console.error(error);
                // Обработка ошибки
                if (error.response.status === 404) {
                  router.push({ name: 'not-found' });
                } else {this.error = error.response.data;}
                });
    },
    categoryList(){
      axios.get('https://api.deadlock-helper.selfdoor.ru/items-categories/')
                .then(response => {
                  this.categories = response.data
                })
                .catch(error => {
                console.error(error);
                // Обработка ошибки
                if (error.response.status === 404) {
                  router.push({ name: 'not-found' });
                } else {this.error = error.response.data;}
                });
    },
    filterItems(item, searchQuery) {
    const typeMatch = this.filterCategory === '' || item.category === this.filterCategory;
    let costMatch;

    if (this.filterCost === '500') {
      costMatch = item.price >= 500 && item.price <= 1250;
    } else if (this.filterCost === '1250') {
      costMatch = item.price >= 1250 && item.price <= 2500;
    } else if (this.filterCost === '3000') {
      costMatch = item.price >= 3000 && item.price < 6000;
    } else if (this.filterCost === '6000+') {
      costMatch = item.price >= 6000;
    } else {
      costMatch = true;
    }

    const nameMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatch && costMatch && nameMatch;
  }
  },
  created(){
    this.itemsList();
    this.categoryList();
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.grid-item:nth-child(1),
.grid-item:nth-child(2) {
  grid-column: auto;
}

.grid-item:nth-child(3) {
  grid-column: 1 / -1;
}

.item_icon{
    width:100%;
    height:100%;
    max-width:120px;
    max-height:120px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
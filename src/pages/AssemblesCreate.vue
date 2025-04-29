<template>
    <div class="wrapper">
      <div class="flex flex-row items-center">
        <Header/>
        <input class="text-xl" type="text" v-model="name" placeholder="Выберите название">
      </div>

      <div class="w-full flex flex-col gap-4 p-2">
        
        <template v-for="(category, index) in categories" :key="index">
          <div class="flex flex-col h-full items-center gap-4 p-2">
            <div class="flex flex-row card rounded-xl w-full">
                <input class="text-xl w-full" v-model="category.name" placeholder="Название категории" required>
                <input type="submit" class="w-1/2 p-2 bg-(--background-button-color) rounded-xl text-(--color-text)" @click="removeCategory(index)" value="Удалить">
            </div>
            <div class="flex flex-row overflow-auto gap-4 mt-4 w-full">
              <template v-for="(item, itemIndex) in category.items" :key="itemIndex">
                <div v-if="item" class="flex flex-col items-center card max-w-30 max-h-76 min-h-48 min-w-30 w-full h-76 rounded-2xl">
                  <div class="item_icon rounded-full">
                    <img :src="item.image_url" />
                  </div>
                  <div class="h-full w-full border-t border-orange-300 text-center">{{ item.name }}</div>
                  <div @click="removeItem(index, itemIndex)" class="text-red-500">Удалить</div>
                </div>
                <div v-else class="flex flex-col items-center justify-center card rounded-2xl max-w-30 min-w-30 w-full h-76">
                  <div @click="openModal(index, itemIndex)" class="flex p-4 justify-center items-center rounded-full text-7xl h-59">+</div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>

      <div class="flex flex-col items-center gap-4">
        <div v-if="error" class="error text-2xl">{{ error }}</div>
        <button  @click="addCategory">Добавить категорию</button>
        <button :disabled="!isValidForm"  @click="saveAssemble">Сохранить сборку</button>
      </div>

      <div v-if="modalOpen" class="fixed top-0 left-0 w-full overflow-y-auto h-screen bg-(--background-back-color) bg-opacity-50">
          <div class="flex">
            <div class="bg-(--background-card-color) p-4 rounded-md w-full">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-bold mb-4 text-(--color-text)">Выберите предмет</h2>
                <h2 class="text-lg font-bold mb-4 text-(--color-text)" @click="closeModal()">Закрыть</h2>
              </div>
              <div class="flex flex-col gap-4 mb-4">
                <input type="text" v-model="searchQuery" placeholder="Введите запрос..." class="rounded-xl p-2 bg-white text-black border-white">
                <div class="flex flex-row gap-4">
                  <select v-model="filterCategory" class="rounded-xl p-2 bg-white text-black border-white">
                    <option value="">Все категории</option>
                    <option v-for="category in categoriesItems" :value="category.id">{{ category.name }}</option>
                  </select>
                  <select v-model="filterCost" class="rounded-xl p-2 bg-white text-black border-white">
                    <option value="">Все стоимости</option>
                    <option value="500">500</option>
                    <option value="1250">1250</option>
                    <option value="3000">3000</option>
                    <option value="6000+">6000+</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-flow-col grid-cols-3 grid-flow-row gap-4">
                <template v-for="(item, itemIndex) in filteredItems" :key="itemIndex">
                  <div @click="selectItem(item)" class="flex flex-col items-center border border-teal-600 h-full">
                    <div class="item_icon rounded-full">
                      <img :src="item.image_url" />
                    </div>
                    <div class="h-full w-full border-t border-orange-300 text-center"><p class="hyphens-auto break-all" lang="ru">{{ item.name }}</p></div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Loader from '../components/Loader.vue';
  import axios from 'axios';

export default {
  components:{
    Header, Loader
  },
  data() {
    return {
      categories: [],
      categoriesItems:[],
      items: [
       
      ],
      searchQuery: '',
      filterCategory: '',
      filterCost: '',
      error: '',
      name:'',
      modalOpen: false,
      character_id: this.$route.params.id,
      selectedCategoryIndex: null,
      selectedCategoryItemIndex: null,
    }
  },
  computed: {
    isValidForm() {
      return this.categories.every(category => category.items.length > 0);
    },
    filteredItems() {
      return this.items.filter(item => {
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

        return (
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.filterCategory === '' || item.category === this.filterCategory) &&
          costMatch
        )
      })
    }
  },
  methods: {
    saveAssemble() {
        if (!this.name || !this.categories.length || !this.categories[0].items.length) {
          this.error = 'Пожалуйста, заполните все поля';
          return;
        }
        const auth_token = localStorage.getItem('auth_token');
        const items_names = this.categories.map(category => category.items.filter(item => item).map(item => item.id)).flat();
        axios.post(`https://api.deadlock-helper.selfdoor.ru/crafts/create/`, {
          name: this.name,
          character: this.character_id,
          categories: this.categories.map(category => ({
            name: category.name,
            items: items_names
          }))
        }, {
          headers: {
            'Authorization': `Token ${auth_token}`
          }
        }).then(response => {
          console.log(response);
          this.$router.push("/");
        }).catch(error => {
          console.error(error);
          if (error.response.status === 404) {
                  router.push({ name: 'not-found' });
                } else if (error.response.status === 401){
                  this.error = 'Необходимо войти в аккаунт';}
                 else {
                  this.error = error.response.data;
                 }
        });
      },
      categoryList(){
      axios.get('https://api.deadlock-helper.selfdoor.ru/items-categories/')
                .then(response => {
                  this.categoriesItems = response.data
                })
                .catch(error => {
                console.error(error);
                // Обработка ошибки
                if (error.response.status === 404) {
                  router.push({ name: 'not-found' });
                } else {this.error = error.response.data;}
                });
    },
    itemsList(){
      axios.get('https://api.deadlock-helper.selfdoor.ru/items/')
                .then(response => {
                  this.items = response.data
                })
                .catch(error => {
                console.error(error);
                // Обработка ошибки
                if (error.response.status === 404) {
                  router.push({ name: 'not-found' });
                } else if (error.response.status === 401){
                  this.error = 'Необходимо войти в аккаунт';}
                 else {
                  this.error = error.response.data;
                 }
                });
    },
    goToHome() {
      this.$router.push('/');
    },
    addCategory() {
      this.categories.push({ name: '', items: [null] });
    },
    removeCategory(index) {
      this.categories.splice(index, 1);
    },
    removeItem(categoryIndex, itemIndex) {
    this.categories[categoryIndex].items.splice(itemIndex, 1);
    if (this.categories[categoryIndex].items.length === 0) {
        this.categories[categoryIndex].items.push(null);
    }
    },
    openModal(categoryIndex, itemIndex) {
      this.modalOpen = true;
      this.selectedCategoryIndex = categoryIndex;
      this.selectedCategoryItemIndex = itemIndex;
    },
    closeModal(){
      this.modalOpen = false;
    },
    selectItem(item) {
      this.categories[this.selectedCategoryIndex].items[this.selectedCategoryItemIndex] = item;
      this.categories[this.selectedCategoryIndex].items.push(null);
      this.modalOpen = false;
    },
  },
  mounted(){
    this.itemsList();
    this.categoryList();
  }
}
</script>
  
  <style>

  </style>
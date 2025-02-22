<template>
    <div class="wrapper">

      <div class="head">
        <button @click="goToHome">Назад</button>
        <font class="namepage">Новая сборка</font>
        <font class="namepage">Сохранить</font>
      </div>

      <div class="flex flex-col gap-4 p-2">
        <div class="flex flex-row h-30 items-center justify-center gap-14">
          <input type="text" placeholder="Выберите название">
        </div>

        <template v-for="(category, index) in categories" :key="index">
          <div class="flex flex-col h-full items-center gap-14">
            <div class="flex flex-row">
                <input v-model="category.name" placeholder="Название категории">
                <button @click="removeCategory(index)">Удалить</button>
            </div>
            <div class="grid grid-flow-col grid-cols-4 grid-flow-row gap-4 mt-4 w-full">
              <template v-for="(item, itemIndex) in category.items" :key="itemIndex">
                <div v-if="item" class="flex flex-col items-center border border-teal-600 h-40">
                  <div class="item_icon rounded-full">
                    <img :src="item.icon" />
                  </div>
                  <div class="h-10 w-full border-t border-orange-300 text-center">{{ item.name }}</div>
                  <div @click="removeItem(index, itemIndex)">Удалить</div>
                </div>
                <div v-else class="flex flex-col items-center border border-teal-600 h-40">
                  <div @click="openModal(index, itemIndex)" class="flex p-4 rounded-full text-7xl">+</div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>

      <div class="fixed bottom-0 inset-x-0 bg-teal-700 h-16 text-center pt-5" @click="addCategory">Добавить категорию</div>
      
      <div v-if="modalOpen" class="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-4 rounded-md w-full">
          <h2 class="text-lg font-bold mb-4 text-teal-700">Выберите предмет</h2>
          <div class="grid grid-flow-col grid-cols-4 grid-flow-row gap-4">
            <template v-for="(item, itemIndex) in items" :key="itemIndex">
              <div @click="selectItem(item)" class="flex flex-col items-center border border-teal-600 h-40">
                <div class="item_icon rounded-full">
                  <img :src="item.icon" />
                </div>
                <div class="h-10 w-full border-t border-orange-300 text-center">{{ item.price }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>

    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      categories: [],
      items: [
        { icon: 'item1.png', name: 'Предмет 1' },
        { icon: 'item2.png', name: 'Предмет 2' },
        { icon: 'item3.png', name: 'Предмет 3' },
        { icon: 'item4.png', name: 'Предмет 4' },
      ],
      modalOpen: false,
      selectedCategoryIndex: null,
      selectedCategoryItemIndex: null,
    }
  },
  methods: {
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
    selectItem(item) {
      this.categories[this.selectedCategoryIndex].items[this.selectedCategoryItemIndex] = item;
      this.categories[this.selectedCategoryIndex].items.push(null);
      this.modalOpen = false;
    },
  }
}
</script>
  
  <style>

  </style>
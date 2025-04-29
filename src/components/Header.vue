<template>
    <div class="flex flex-row items-center w-full h-full p-4">
      <button class="arrow-left" @click="goToBack">
      </button>
      <div class="flex flex-col items-center w-full">
        <span class="namepage w-full text-3xl">{{ currentPage }}</span>
        <span v-if="currenttextPage" class="text-sm">{{ currenttextPage }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
      const currentPage = ref('');
      const currenttextPage = ref('');
  
      const updateCurrentPage = () => {
        switch (route.name) {
          case 'home':
            currentPage.value = 'Главная';
            break;
          case 'Characters':
            currentPage.value = 'Персонажи';
            break;
          case 'Items':
            currentPage.value = 'Предметы';
            break;
          case 'Assembles':
            currentPage.value = 'Сборки';
            currenttextPage.value = 'Выберите персонажа для сборки';
            break;
          case 'PersonAssembles':
            currentPage.value = 'Сборки на ' + route.query.name;
            break;
          case 'AssemblesCard':
            currentPage.value = route.query.name;
            currenttextPage.value = route.query.author;
            break;
          case 'Favorites':
            currentPage.value = 'Избранное';
            break;
          case 'Login':
            currentPage.value = 'Авторизация';
            break;
          case 'Register':
            currentPage.value = 'Регистрация';
            break;
          default:
            currentPage.value = '';
            currenttextPage.value = '';
        }
      };
  
      onMounted(() => {
        updateCurrentPage();
      });
  
      watch(route, () => {
        updateCurrentPage();
      });
  
      return {
        currentPage,
        currenttextPage,
        goToBack: () => {
          history.back();
        },
      };
    },
  };
  </script>

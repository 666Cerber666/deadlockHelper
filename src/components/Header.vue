<template>
  <div class="head flex flex-row items-center w-full">
        <button class="w-1/2 text-xs text-left h-12 bg-inherint" @click="goToBack">
            <span class="arrow-left"></span>
        </button>
        <font class="namepage w-full text-2xl">{{ currentPage }}</font>
      </div>
</template>

<script>
import { ref } from 'vue';
export default {
    methods:{
        goToBack(){
            this.$router.push('/')
        }
    },
    data() {
        return {
            currentPage: ref('')
        }
    },
    mounted() {
        if (this.$route.name === 'home') {
            this.currentPage = 'Главная';
        } else if (this.$route.name === 'Characters') {
            this.currentPage = 'Персонажи';
        } else if (this.$route.name === 'Items') {
            this.currentPage = 'Предметы';
        } else if (this.$route.name === 'Assembles'){
            this.currentPage = 'Выберите персонажа';
        }
        }
    }
</script>

<style>

</style>
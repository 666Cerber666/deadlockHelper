<template>
    <div class="wrapper">
      <div class="head flex flex-row items-center">
        <Header />
      </div>

      <div class="flex flex-col mb-4 p-4">
        <div class="flex flex-row h-12 justify-between">
            <div class="text-center border w-full">Оружие</div>
            <div class="text-center border w-full">Магия</div>
            <div class="text-center border w-full">Живучесть</div>
        </div>
        
        <div class="flex flex-row h-12 justify-between">
            <div class="text-center border w-full">500</div>
            <div class="text-center border w-full">1250</div>
            <div class="text-center border w-full">3000</div>
            <div class="text-center border w-full">6000+</div>
        </div>
      </div>

      <div class="flex flex-col gap-4 p-2">
          <div class="flex flex-row h-30 items-center gap-14" @click="goToPersonCard"><div class="item_icon rounded-xl"></div><div class="text-2xl">Базовый магазин</div></div>
          <div class="flex flex-row h-30 items-center gap-14" @click="goToPersonCard"><div class="item_icon rounded-xl"></div><div class="text-2xl">Базовый магазин</div></div>
      </div>
    </div>
  </template>

<script>
  import Header from '../components/Header.vue'

export default {
  components:{
    Header
  },
  methods:{
    goToBack(){
      this.$router.push('/');
  }
  }
}
</script>

<style>
.item_icon{
    width:100%;
    height:100%;
    max-width:120px;
    max-height:120px;
    background-image: url('../assets/item_icons/Basic_Magazine.png');
    background-size: 100%;
    background-position: center;
}
</style>
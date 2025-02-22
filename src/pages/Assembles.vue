<template>
    <div class="wrapper">
      <Header />
      <div class="flex flex-col gap-4 p-2">
          <div class="flex flex-row h-30 items-center gap-14" @click="goToPersonAssembles"><div class="person_icon rounded-xl"></div><div class="text-2xl">Абрамс</div></div>
          <div class="flex flex-row h-30 items-center gap-14" @click="goToPersonAssembles"><div class="person_icon rounded-xl"></div><div class="text-2xl">Абрамс</div></div>
      </div>
    </div>
  </template>

<script>
    import Header from '../components/Header.vue'

    export default {
        components:{
            Header
        },
        methods: {
            goToPersonAssembles(){
            this.$router.push('/PersonAssembles');
            }
        }
}

</script>

<style>

</style>
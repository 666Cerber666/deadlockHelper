<template>
    <div class="wrapper">
      <div class="head">
          <button @click="goToHome">Назад</button>
          <font class="namepage">Сборки на Абрамс</font>
          <font class="namepage">Поиск</font>
      </div>
      <div class="flex flex-col gap-4 p-2">
          <div class="flex flex-row h-30 items-center gap-14" @click="goToAssemblesCard"><div class="text-2xl">Абрамс через руку<p>создатель: asdasd</p></div><div>В избранное</div></div>
          <div class="flex flex-row h-30 items-center gap-14" @click="goToAssemblesCard"><div class="text-2xl">Абрамс через руку<p>создатель: asdasd</p></div><div>В избранное</div></div>
      </div>
      <div class="fixed bottom-0 inset-x-0 bg-teal-700 h-16 text-center pt-5" @click="goToAddAssembles">Создать новую сборку</div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToHome() {
        this.$router.push('/');
      },
      goToAssemblesCard(){
        this.$router.push('/AssemblesCard');
      },
      goToAddAssembles(){
        this.$router.push('/AssemblesCreate');
      }
    }
  }
  </script>
  
  <style>
  .namepage{
    text-align: center;
  }
  .head{
    background-color: rgb(117, 180, 159);
    color:wheat;
    font-weight: 700;
    font-family: inherit;
    margin-bottom:10px;
  }
  .head>button{
    color:wheat;
    background-color: inherit;
  }
  .person_icon{
    width:100%;
    height:100%;
    max-width:120px;
    max-height:120px;
    background-image: url('../assets/person_icons/abrams/Abrams.png');
    background-size: 100%;
    background-position: center;
  }
  </style>
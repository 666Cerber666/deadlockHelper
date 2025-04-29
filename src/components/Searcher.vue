<template>
    <div class="card rounded-3xl flex flex-row">
      <input type="text" @input="search" v-model="searchQuery" placeholder="Введите запрос...">
      <button @click="search" class="flex items-center justify-center"><img src="/public/icons/search.svg"></button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      filterFunction: Function
    },
    data() {
      return {
        searchQuery: ''
      }
    },
    methods: {
      search() {
        this.$emit('search', this.searchQuery)
      }
    }
  }
  </script>
  
  <style scoped>
  .card button {
    width: 10%;
    background-color: inherit;
    border-radius:0px 15px 15px 0px;
    padding: 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .card input{
    width:100%;
    padding-left:5px;
  }
  
  .card input:hover{
    border-radius:15px 0px 0px 15px;
  }

  </style>
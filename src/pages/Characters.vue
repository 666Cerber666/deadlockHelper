<template>
  <div class="wrapper">
    <Header/>
    <div class="flex flex-col gap-4 p-2">
      <template v-for="(character, index) in characters" :key="index">
        <div class="flex flex-row h-30 items-center gap-14 border-yellow:hover" @click="goToCharacterCard(character)">
          <div class="character_icon rounded-xl">
            <img class="w-24 h-24 rounded-md" :src="character.icon" />
          </div>
          <div class="text-2xl">{{ character.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  components: { Header },
  data() {
  return {
    characters: [
      { name: 'Абрамс', icon: 'person_icons/Abrams.png' },
      { name: 'Брэдли', icon: 'person_icons/Bebop.png' },
      { name: 'Шерман', icon: 'person_icons/Bebop.png' },
    ]
  }
},
  methods: {
    goToBack() {
      this.$router.push('/');
    },
    goToCharacterCard(character) {
      this.$router.push({ name: 'PersonCard', params: { character: character.name } });
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
  background-image: url('../../public/person_icons/Abrams.png');
  background-size: 100%;
  background-position: center;
}
</style>
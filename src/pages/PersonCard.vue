<template>
  <div v-if="character && character.vitality" class="wrapper">
    <div class="h-full flex flex-col px-4">
        <Header/>
        <div class="flex flex-row h-full items-center justify-evenly mt-4"><div class="rounded-xl mt-2"><img class="person_image rounded-xl" :src="character.image_url" /></div><div class="text-2xl ml-10">{{character.name}}</div></div>
    </div>
    <div class="text-left p-4 mt-10">
        <h2 class="text-2xl">Описание персонажа:</h2>
        <br>
        <p>{{ character.description }}</p>
        <br>
        <div class="flex flex-col text-left">

            <h2 class="text-2xl">Способности</h2>
            <br>

            <div class="flex flex-col gap-4 mt-4">
                <div v-for="(ability, index) in character.abilities" :key="index" class="flex flex-row items-center card rounded-xl px-2">
                    <img class="w-16 h-16 rounded-md mx-4 character_icon" :src="ability.image_url" />
                  <div>
                    <h3 class="text-xl">{{ ability.name }}</h3>
                    <p>{{ ability.description }}</p>
                  </div>
                </div>
            </div>

            <div class="flex flex-col justify-between p-4">
              <div class="flex flex-col">
                <h2 class="text-2xl">Характеристики Vitality:</h2>
                <br>
                <ul class="pl-5">
                  <li>Здоровье: {{ character.vitality.health }}</li>
                  <li>Регенерация здоровья: {{ character.vitality.health_regeneration }}</li>
                  <li>Сопротивление от пуль: {{ character.vitality.bullet_resistance }}%</li>
                  <li>Сопротивление от дух.урона: {{ character.vitality.spirit_damage_resistance }}%</li>
                  <li>Скорость передвижения: {{ character.vitality.movement_speed }}м/c</li>
                  <li>Скорость бега: {{ character.vitality.running_speed }}м/c</li>
                  <li>Выносливость: {{ character.vitality.endurance }}</li>
                </ul>
                <br>
              </div>
              <div class="flex flex-col">
                <h2 class="text-2xl">Характеристики Weapon:</h2>
                <br>
                <ul class="pl-5">
                  <li>Урон в секунду: {{ character.weapon.damage_per_second }}</li>
                  <li>Урон оружия: {{ character.weapon.weapon_damage }}</li>
                  <li>Патроны: {{ character.weapon.ammunition }}</li>
                  <li>Скорострельность: {{ character.weapon.rate_of_fire }}</li>
                  <li>Урон легкой ближней атаки: {{ character.weapon.light_melee_damage }}</li>
                  <li>Урон тяжелой ближней атаки: {{ character.weapon.heavy_melee_damage }}</li>
                </ul>
              </div>
            </div>
        </div>
    </div>
  </div>
  <Loader v-else/>
</template>

<script>
import Header from '../components/Header.vue'
import Loader from '../components/Loader.vue'
import axios from 'axios'

export default {
    components:{
        Header, Loader
    },
    data() {
      return {
        skills: [
        
        ],
        character: {}
      }
    },
    methods:{
        GoToBack(){
            this.$router.push('/characters');
        },
        
        async PersonData(){
          try {
            axios.get(`https://api.deadlock-helper.selfdoor.ru/characters/${this.$route.params.id}`)
                .then(response => {
                  this.character = response.data
                })}
                catch(error) {
                console.error(error);
                if (error.response.status === 404) {
                  router.push({ name: 'not-found' });
                } else {this.error = error.response.data;}
                };
        }
    },
    created() {
    if (this.$route.params.id) {
      this.PersonData();
    } else {
      console.log('Параметр id не найден в URL');
    }
  }
}
</script>

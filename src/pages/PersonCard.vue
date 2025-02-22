<template>
  <div class="wrapper">
    <div class="head h-48 flex flex-col px-4">
        <button class="w-full text-xs text-left h-12 bg-inherint" @click="GoToBack">
            <span class="arrow-left"></span>
        </button>
        <div class="flex flex-row h-full items-center justify-evenly mt-4"><div class="person_icon rounded-xl mt-2"></div><div class="text-2xl">Абрамс</div></div>
    </div>
    <div class="text-center p-4"><p>Abrams is a Hero in Deadlock. He is a hard-boiled, hard-hitting bruiser of a character that focuses on engaging groups of enemies and relying on his high health, high damage output, and life draining ability to stay in the fight. With a powerful area stun and a devastating shoulder charge, Abrams can isolate fragile targets from the rest of the team and set-up his more damaging allies to finish them off.</p>
        <br>
    <p>A capable and well-known detective of New York, Abrams solved crimes ranging from kidnappings to ritual murders. One day, a mysterious Tome was left on his desk with a note of "Don't let them have it" scrolled in Onyx blood; followed by car bombings and break-ins to his office. Now, Abrams is trying to figure out just what the hell is going on.</p></div>
    <div class="p-4">
        <div class="flex flex-col text-center">

            <h2>Skills</h2>

            <div class="flex flex-col gap-4 mt-4">
                <div class="flex flex-row border border-teal-600"><div class="skill_ico w-16 h-16 rounded-full"></div><div class="">Drain health from enemies in front of you while they are in the radius.</div></div>
                <div class="flex flex-row border border-teal-600"><div class="skill_ico w-16 h-16 rounded-full"></div><div class="">Drain health from enemies in front of you while they are in the radius.</div></div>
                <div class="flex flex-row border border-teal-600"><div class="skill_ico w-16 h-16 rounded-full"></div><div class="">Drain health from enemies in front of you while they are in the radius.</div></div>
                <div class="flex flex-row border border-teal-600"><div class="skill_ico w-16 h-16 rounded-full"></div><div class="">Drain health from enemies in front of you while they are in the radius.</div></div>
            </div>
            
            <h2>Abilities</h2>

            <div class="flex flex-row justify-between p-4">
                <div class="flex flex-col">
                    <h2>Weapon Stats</h2>
                    <ul>
                        <li>DPS:</li>
                        <li>Ammo:</li>
                        <li>Bullets per sec:</li>
                        <li>Reload Time:</li>
                        <li>Bullet Velocity:</li>
                        <li>Light Melee:</li>
                        <li>Heavy Melee:</li>
                        <li>Falloff Range:</li>
                    </ul>
                </div>
                <div class="flex flex-col">
                    <h2>Vitality Stats</h2>
                    <ul>
                        <li>Health:</li>
                        <li>Health Regen:</li>
                        <li>Move Speed:</li>
                        <li>Stamina:</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        GoToBack(){
            this.$router.push('/characters');
        }
    }
}
</script>

<style>
.skill_ico{
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url('../assets/person_icons/abrams/skills/1-skill.png');
}
.arrow-left {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #000;
}
</style>
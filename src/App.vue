<script setup>
  import Entete from "./components/Entete.vue";
  import { ref } from "vue";
  import ModeRempli from "./components/ModeRempli.vue";
  import ModeRecher from "./components/ModeRecher.vue";

  let modeR = ref(true);
</script>

<template>
  <Entete />
  <button class="CR" @click="modeR=!modeR" v-if="modeR">CREER<br/>un Livre</button>
  <button class="RE" @click="modeR=!modeR" v-else>RECHERCHER<br/>un Livre</button>
  <p class="RE" v-if="modeR">RECHERCHER<br/>un Livre</p>
  <p class="CR" v-else>CREER<br/>un Livre</p>

  <ModeRecher v-if="modeR"></ModeRecher>
  <ModeRempli v-else></ModeRempli>
</template>

<style scoped>
  button,p {
    font-family: "Arial Black","Arial"; font-size: 18px; color: black;
    border-color: black; border-style: solid; 
  }
  p {
    background-color: rgb(0, 255, 255); height: 54px; width: 195px; text-align: center;
  }
  button {
    background-color: rgb(193, 255, 255); height: 60px; width: 200px;
  }
  .CR{
    border-radius: 20px 0px 0px 20px;
  }
  .RE {
    border-radius: 0px 20px 20px 0px; 
  }
  button.CR {
    position: absolute; top: 40px; left: 425px;
  }
  p.CR {
    position:absolute; top: 22px; left: 425px;
  }
  button.RE {
    position: absolute; top: 40px; left: 625px;
  }
  p.RE {
    position:absolute; top: 22px; left: 625px;
  }
</style>
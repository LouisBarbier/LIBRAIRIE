<script setup>
  import Entete from "./components/Entete.vue";
  import { ref } from "vue";
  import ModeRempli from "./components/ModeRempli.vue";
  import ModeRecher from "./components/ModeRecher.vue";

  let modeR = ref(true); /*modeR permet de savoir si on est en mode Recherche*/
</script>

<template>
  <Entete />
  <button class="CR" @click="modeR=!modeR" v-if="modeR">CREER<br/>un Livre</button> <!--Bouton envoyant vers le mode Création-->
  <button class="RE" @click="modeR=!modeR" v-else>RECHERCHER<br/>un Livre</button> <!--Bouton envoyant vers le mode Recherche-->
  <p class="RE" v-if="modeR">RECHERCHER<br/>un Livre</p> <!--Faux Bouton mode Recherche (Non clickable)-->
  <p class="CR" v-else>CREER<br/>un Livre</p> <!--Faux Bouton mode Création (Non clickable)-->

  <ModeRecher v-if="modeR"></ModeRecher> <!--mode Recherche-->
  <ModeRempli v-else></ModeRempli> <!--mode Création-->
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
  button:hover {
    background-color: rgb(130, 255, 255);
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
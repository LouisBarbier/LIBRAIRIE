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
button,p{
  background-color: rgb(193, 255, 255); font-family: "Arial Black","Arial"; font-size: 18px; color: black;
  height: 60px; width: 200px; border-color: black; border-style: solid; 
}
p {
  text-align: center; background-color: rgb(0, 255, 255);
}
.CR{
  border-radius: 20px 0px 0px 20px;
}
button.CR {
  position: relative; top: 20px; left: 425px;
}
p.CR {
  position:relative; bottom: 60px; left: 425px;
}
.RE {
  border-radius: 0px 20px 20px 0px; 
}
button.RE {
  position: relative; top: 20px; left: 625px;
}
p.RE {
  position:relative; bottom: 60px; left: 625px;
}
</style>
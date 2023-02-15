<script setup>
  import Entete from "./components/Entete.vue";
  import { ref } from "vue";
  import ModeRempli from "./components/ModeRempli.vue";
  import ModeRecher from "./components/ModeRecher.vue";

  let modeR = ref(true);
</script>

<template>
  <Entete />
  <button @click="modeR=!modeR">MODE</button>
  <ModeRecher v-if="modeR"></ModeRecher>
  <ModeRempli v-else></ModeRempli>
</template>

<style>
</style>
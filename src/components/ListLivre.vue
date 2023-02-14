<script setup>
import { reactive } from "vue";
import { onMounted } from "vue";
import Livre from "./Livre.vue";
import LivreClass from "../LivreClass";
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres/";
let listeC = reactive([]);
function getLivres() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      listeC.splice(0, listeC.length);
      dataJSON.forEach((v) =>
        listeC.push(new LivreClass(v.id, v.titre, v.qtestock, v.prix))
      );
    })
    .catch((error) => console.log(error));
}
onMounted(() => {
  getLivres();
});
</script>

<template>
  <h3>Liste des livres</h3>
  <ul>
    <Livre
      v-for="(livre, index) of listeC"
      :key="livre.id"
      :livre="livre"
      :indexl="index"
    />
  </ul>
</template>

<style scoped>
</style>
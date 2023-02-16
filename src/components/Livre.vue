<script setup>
  defineProps(["livre", "indexl"]);
  defineEmits(["deletel","add1","del1"]);
</script>

<template>
  <li>
    <p id="titr">{{livre.titre}}</p>
    <p id="qte">{{livre.qtestock}}</p>
    <p id="prix">{{livre.prix}}</p>
    <button id="sup" @click="$emit('add1', indexl)">^</button>
    <button id="inf" @click="$emit('del1', indexl)">v</button>
    <button id="del" @click="$emit('deletel', indexl)">Supprimer</button>
  </li>
</template>

<style scoped>
li {
  display:inline-block; background: #555555; vertical-align: top;
  width: 150px; height:200px; border-radius: 10px; margin:5px 10px 5px 10px;
}

p#titr {
  color: #ffffff; text-align: center;
  text-transform: uppercase; width: 150px; font-size: 2rem;
  
}
</style>
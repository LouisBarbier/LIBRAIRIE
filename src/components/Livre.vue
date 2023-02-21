<script setup>
  defineProps(["livre", "indexl"]); /*attribut à donné lors de la création d'un Livre*/
  defineEmits(["deletel","add1","del1"]); /*évènement que peut envoyer un Livre*/
</script>

<template>
  <li> <!--Affichage du livre-->
    <p id="titr">{{livre.titre}}</p>
    <p id="qte">{{livre.qtestock}}</p>
    <p id="prix">{{livre.prix}} €</p>
    <button id="sup" class="flech" @click="$emit('add1', indexl)">▲</button> <!--Bouton pour ajoutter 1 livre à la quantité en stock-->
    <button id="inf" class="flech" @click="$emit('del1', indexl)">▼</button> <!--Bouton pour retirer 1 livre à la quantité en stock-->
    <button id="del" @click="$emit('deletel', indexl)">SUPPRIMER</button> <!--Bouton pour supprimer le livre de la librairie-->
  </li>
</template>

<style scoped>
  li {
    display:inline-block; background: #555555; vertical-align: top;
    width: 275px; height:400px; border-radius: 10px; margin:10px;
  }

  p#titr {
    color: #ffffff; text-align: center; width: 275px; height: 200px;
    font-size: 35px; position: relative; bottom: 30px; font-family: "Century Gothic", "sans-serif", "Arial";
  }

  p#prix {
    background-color: #ffffff; width: 100px; height: 25px; border-radius: 5px; text-align:center;
    font-size: 20px; font-family: "Century Gothic", "sans-serif", "Arial"; color: #000000;
    position:relative; top:12px; left:167px;
  }

  p#qte {
    display: block; color: #000000; font-size: 20px; font-family: "Arial Black","Arial";
    background-color: #cbcbcb; height: 30px; width: 30px; text-align:center; border-radius: 10px;
    position:relative; top: 30px; left: 8px; border-color: #000000; border-style:solid;
  }

  button.flech {
    background-color: #00000000; border-style:none; font-size: 30px;
  }

  button#sup {
    position: relative; bottom:109px; left: 7px;
  }

  button#inf {
    position: relative; bottom:40px; right: 30px;
  }

  button#del {
    color: #ff0000; font-size: 12px; font-family: "Arial Black","Arial";
    background-color: #ffefef; border-color: #000000; border-style: groove; border-radius: 5px;
    position:relative; bottom: 80px; right: 25px;
  }
</style>
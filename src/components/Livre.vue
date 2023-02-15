<script setup>
  defineProps(["livre", "indexl"]);
  defineEmits(["deletel","add1","del1"]);
</script>

<template>
  <li>
    {{ livre.pourAfficher() }}
    <button @click="$emit('add1', indexl)">^</button>
    <button @click="$emit('del1', indexl)">v</button>
    <button @click="$emit('deletel', indexl)">Supprimer</button>
  </li>
</template>

<style>
</style>
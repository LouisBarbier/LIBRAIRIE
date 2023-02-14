<script setup>
  defineProps(["livre", "indexl"]);
  defineEmits(["deletel"]);
</script>

<template>
  <li>
    {{ livre.pourAfficher() }}
    <button @click="$emit('deletel', indexl)">Supprimer</button>
  </li>
</template>

<style>
</style>
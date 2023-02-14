<script setup>
  defineProps(["livre", "indexl"]);
</script>

<template>
  <li>
    {{ livre.pourAfficher() }}
  </li>
</template>

<style>
</style>
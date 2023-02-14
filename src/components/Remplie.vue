<script setup>
    import { ref } from "vue";
    
    const titre = ref("");
    const emit = defineEmits(["addc"]);
    function handlerSubmit() {
        emit("addc", titre.value);
        titre.value = "";
    }
</script>

<template>
    <form @submit.prevent="handlerSubmit">
    <input type="text" v-model="titre" placeholder="Nom du nouveau livre" />

    <input type="submit" value="valider" />
  </form>
</template>

<style scoped>
</style>
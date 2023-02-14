<script setup>
    import { reactive } from "vue";
    import { onMounted } from "vue";
    import { ref } from "vue";
    
    const titre = ref("");
    const qtestock = ref("");
    const prix = ref("");
    let listeT = reactive([]);
    defineProps(["titres"]);
    const emit = defineEmits(["addl"]);
    function handlerSubmit() {
        emit("addl", titre.value,qtestock.value,prix.value);
        titre.value = "";
        qtestock.value = "";
        prix.value = "";
    }

    function actionTitre (event){
        const url="https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres?search="+titre.value;
        const fetchOptions={};
        fetch(url,fetchOptions)
            .then((response) =>{
                return response.json()
                }
            )
            .then((dataJSON)=>{
                listeT.splice(0, listeT.length);
                dataJSON.forEach((v) =>
                    listeT.push(v.titre))
                console.log(listeT)
            })
            .catch((error)=>{
                console.log(error)
                }
            )
    }

    onMounted(() => {
    actionTitre();
    });
</script>

<template>
    <form @submit.prevent="handlerSubmit">
        <input id="titreL" type="text" v-model="titre" placeholder="Nom du nouveau livre" @input="actionTitre"/>
        <select>
            <option v-for="(titre) of listeT">{{ titre }}</option>
        </select>
        <input type="number" v-model="qtestock" placeholder="Quantitée en stock"/>
        <input type="number" min="0" v-model="prix" placeholder="Prix"/>
        <input type="submit" value="valider" />
    </form>
</template>

<style scoped>
</style>
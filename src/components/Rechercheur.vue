<script setup>
    import { reactive } from "vue";
    import { onMounted } from "vue";
    import { ref } from "vue";
    
    const titre = ref("");
    let listeT = reactive([]);

    function actionTitre (){
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
                    listeT.push(v))
            })
            .catch((error)=>{
                console.log(error)
                }
            )
    }

    onMounted(() => {
    actionTitre();
    });

    const selec = ref("")
    function selection () {
        titre.value=selec.value;
    }
</script>

<template>
    <form>
        <input type="text" v-model="titre" placeholder="Nom du livre" @input="actionTitre"/>
        <select v-model="selec" @change="selection">
            <option v-for="(livre) of listeT">{{ livre.titre }}</option>
        </select>
    </form>
</template>

<style scoped>
</style>
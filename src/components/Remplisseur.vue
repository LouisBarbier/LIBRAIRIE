<script setup>
    import { onMounted } from "vue";
    import { ref } from "vue";
    
    const titre = ref("");
    const qtestock = ref("");
    const prix = ref("");
    let listeT = [];

    const emit = defineEmits(["addl"]);
    
    function handlerSubmit() {
        emit("addl", titre.value,qtestock.value,prix.value);
        titre.value = "";
        qtestock.value = "";
        prix.value = "";
    }

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
                let titres=[]
                dataJSON.forEach((v) =>
                    titres.push(v.titre))
                if (titres.indexOf(titre.value)!=-1){
                    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                }
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
        <input type="text" v-model="titre" placeholder="Nom du nouveau livre" @input="actionTitre"/>
        <input type="number" min="1" v-model="qtestock" placeholder="Quantitée en stock"/>
        <input type="number" min="0" step="0.01" v-model="prix" placeholder="Prix"/>
        <input type="submit" value="Créer"/>
    </form>
</template>

<style scoped>
</style>
<script setup>
    import { onMounted } from "vue";
    import { ref } from "vue";
    import LivreClass from "../LivreClass";
    import Livre from "./Livre.vue"

    const titre = ref("");
    const qtestock = ref("");
    const prix = ref("");
    const url="https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres";
    function handlerSubmit() {
        const head=new Headers()
        head.append("Content-Type", "application/json")
        const fetchOptions={method: "POST",
            headers: head,
            body: JSON.stringify({ titre : titre.value ,
                                   qtestock : qtestock.value ,
                                   prix : prix.value })}
        fetch(url,fetchOptions)
            .then((response) => {
                titre.value = "";
                qtestock.value = "";
                prix.value = "";
            })
            .catch((error) =>
                console.log(error)
            )
    }

    function actionTitre() {
        const fetchOptions={};
        fetch(url+"?search="+titre.value,fetchOptions)
            .then((response) =>{
                return response.json()
                }
            )
            .then((dataJSON)=>{
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
    <Livre
        :key="0"
        :livre="new LivreClass(0,titre,qtestock,prix)"
        :indexl="0"
        :react="false"
    />
</template>

<style scoped>
</style>
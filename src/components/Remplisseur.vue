<script setup>
    import { reactive } from "vue";
    import { onMounted } from "vue";
    import { ref } from "vue";
    
    const titre = ref("");
    const qtestock = ref("");
    const prix = ref("");
    let listeT = reactive([]);
    let mini =  ref(0)
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
                if (titres.indexOf(titre.value)==-1){
                    mini.value=0;
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

    const selec = ref("")
    function selection () {
        titre.value=selec.value;
        qtestock.value=0;
        valid="MODIFIER";
        for (let l of listeT){
            if (l.titre==selec.value){
                mini.value=-l.qtestock;
                prix.value=l.prix;
                break
            }
        }
    }

    let valid = ref("CREER")
</script>

<template>
    <form @submit.prevent="handlerSubmit">
        <input id="titreL" type="text" v-model="titre" placeholder="Nom du nouveau livre" @input="actionTitre"/>
        <input type="number" v-bind:min="mini" v-model="qtestock" placeholder="Quantitée en stock"/>
        <input type="number" min="0" step="0.01" v-model="prix" placeholder="Prix"/>
        <input type="submit" v-bind:value="valid"/>
    </form>
    <select v-model="selec" @change="selection">
        <option v-for="(livre) of listeT">{{ livre.titre }}</option>
    </select>
</template>

<style scoped>
</style>
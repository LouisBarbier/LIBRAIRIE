<script setup>
    import { reactive } from "vue";
    import { onMounted } from "vue";
    import { ref } from "vue";
    
    const titre = ref("");
    let listeT = reactive([]);

    const emit = defineEmits(["recherche"]);
    
    function handlerSubmit() {
        emit("recherche",titre.value);
    }

    function actionTitre (){
        const fetchOptions={ method: "GET" };
        fetch("https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres?search="+titre.value,fetchOptions)
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
        handlerSubmit()
    }
</script>

<template>
    <form @submit.prevent="handlerSubmit">
        <input id="titr" type="text" v-model="titre" placeholder="Nom du livre" @input="actionTitre" @submit="handlerRecherche"/>
        <select v-model="selec" @change="selection">
            <option v-for="(livre) of listeT">{{ livre.titre }}</option>
        </select>
        <input id="sub" type="submit" value="&#128269;" aria-label="RECHERCHER"/>
    </form>
</template>

<style scoped>
input#titr{
    width: 600px; height: 30px; position: absolute; top: 130px; left: 265px;
    font-family: "Century Gothic", "sans-serif", "Arial"; font-size: 20px;
}
select {
    width: 72px; height: 36px; position: absolute; top: 130px; left: 873px;
    font-family: "Century Gothic", "sans-serif", "Arial";
}
input#sub{
    width: 36px; height: 36px; position: absolute; top: 130px; left: 945px;
}
</style>
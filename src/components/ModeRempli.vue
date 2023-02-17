<script setup>
    import { onMounted } from "vue";
    import { ref } from "vue";
    import LivreClass from "../LivreClass";
    import Livre from "./Livre.vue"

    let titre = ref("");
    let qtestock = ref("");
    let prix = ref("");
    let titreOK = ref(true);
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
                if (titres.indexOf(titre.value)!=-1){ titreOK=false; }
                else { titreOK=true }
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
        <input type="submit" value="CREER" v-if="titreOK"/>
        <p v-else>CREER</p>
    </form>
    <div>
        <p id="titr">{{titre}}</p>
        <p id="qte">{{qtestock}}</p>
        <p id="prix">{{prix}} €</p>
    </div>
</template>

<style scoped>
    form {
        position: relative; top: 30px;
    }
    div {
        display:inline-block; background: #555555; vertical-align: top;
        width: 275px; height:400px; border-radius: 10px; margin:5px 10px 5px 10px;
    }
    p#titr {
        color: #ffffff; text-align: center; text-transform: uppercase; width: 275px; height: 200px;
        font-size: 50px; position: relative; bottom: 40px; font-family: "Century Gothic", "sans-serif", "Arial";
    }
    p#prix {
        background-color: #ffffff; width: 100px; height: 25px; border-radius: 5px; text-align:center;
        font-size: 20px; font-family: "Century Gothic", "sans-serif", "Arial"; color: #000000;
        position:relative; top:5px; left:160px;
    }
    p#qte {
        display: block; color: #000000; font-size: 20px; font-family: "Arial Black","Arial";
        background-color: #cbcbcb; height: 30px; width: 30px; text-align:center; border-radius: 10px;
        position:relative; top: 30px; left: 8px; border-color: #000000; border-style:solid;
    }
</style>
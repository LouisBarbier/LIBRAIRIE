<script setup>
    import { onMounted } from "vue";
    import { ref } from "vue";
    import { reactive } from "vue";

    let titre = ref("");
    let qtestock = ref("");
    let prix = ref("");
    let titres=reactive([])
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
        fetch(url,fetchOptions)
            .then((response) =>{
                return response.json()
                }
            )
            .then((dataJSON)=>{
                titres.splice(0, titres.length);
                dataJSON.forEach((v) =>
                    titres.push(v.titre))
            })
            .catch((error)=>{
                console.log(error)
                }
            )
    }

    onMounted(() => {
    actionTitre();
    });

    function probTitre (){
        alert ("IMPOSSIBLE DE CREER UN LIVRE AVEC CE TITRE\n\n(un autre livre le possède déjà)")
    }
</script>

<template>
    <form @submit.prevent="handlerSubmit">
        <p id="ntitr">TITRE</p>
        <input id="ititr" type="text" v-model="titre" placeholder="Nom du nouveau livre" required="true"/>
        <p id="nqte">QUANTITEE DE DEPART</p>
        <input id="iqte" type="number" min="1" v-model="qtestock" placeholder="Quantitée de départ" required="true"/>
        <p id="nprix">PRIX</p>
        <input id="iprix" type="number" min="0" step="0.01" v-model="prix" placeholder="Prix du nouveau livre" required="true"/>
        <input class="sub" type="submit" value="CREER" v-if="titres.indexOf(titre)==-1"/>
        <p class="sub" v-else @click="probTitre">CREER</p>
    </form>
    <div>
        <p id="titr">{{titre}}</p>
        <p id="qte">{{qtestock}}</p>
        <p id="prix">{{prix}} €</p>
    </div>
</template>

<style scoped>
    input {
        border-radius: 1px; border-style: solid; border-color: #555555;
        height: 30px;
    }
    p {
        font-family: "Century Gothic", "sans-serif", "Arial"; font-size: 15px;
    }
    input#ititr {
        width: 455px;
        position: absolute; top: 130px; left: 10px; font-family: "Century Gothic", "sans-serif", "Arial";
    }
    p#ntitr {
        position: absolute; top: 98px; left: 10px;
    }
    input#iqte {
        position: absolute; top: 185px; left: 10px; font-family: "Arial Black", "Arial"; width: 221px;
    }
    p#nqte {
        position: absolute; top: 153px; left: 10px;
    }
    input#iprix {
        position: absolute; top: 185px; left: 244px; font-family: "Arial Black", "Arial"; width: 221px;
    }
    p#nprix {
        position: absolute; top: 153px; left: 244px;
    }
    input.sub{
        position: absolute; top: 227px; left: 10px; height: 45px; width: 463px;
        border-style: solid; border-color: #555555; background-color: #e5e5e5; border-radius: 2px;
        border-width: 2px;
        font-family: "Arial"; font-size: 20px;
    }
    p.sub {
        position: absolute; top: 207px; left: 10px; height: 41px; width: 459px;
        border-style: solid; border-color: #554545; background-color: #e5b8b8; border-radius: 2px;
        border-width: 2px;
        text-align: center; line-height: 41px; font-family: "Arial"; font-size: 20px;
    }
    div {
        display:inline-block; background: #555555; vertical-align: top;
        width: 275px; height:400px; border-radius: 10px; margin:5px 10px 5px 10px;
        position: absolute; left: 475px; top: 110px;
    }
    p#titr {
        color: #ffffff; text-align: center; width: 275px; height: 200px;
        font-size: 50px; position: relative; bottom: 40px; font-family: "Century Gothic", "sans-serif", "Arial";
    }
    p#prix {
        background-color: #ffffff; width: 100px; height: 25px; border-radius: 5px; text-align:center;
        font-size: 20px; font-family: "Century Gothic", "sans-serif", "Arial"; color: #000000;
        position:relative; top:12px; left:167px;
    }
    p#qte {
        display: block; color: #000000; font-size: 20px; font-family: "Arial Black","Arial";
        background-color: #cbcbcb; height: 30px; width: 30px; text-align:center; border-radius: 10px;
        position:relative; top: 30px; left: 8px; border-color: #000000; border-style:solid;
    }
</style>
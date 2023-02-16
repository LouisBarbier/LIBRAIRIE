<script setup>
    import { onMounted } from "vue";
    import { ref } from "vue";

    const titre = ref("");
    const qtestock = ref("");
    const prix = ref("");
    let listeT = [];
    
    function handlerSubmit() {
        const head=new Headers()
        head.append("Content-Type", "application/json")
        const fetchOptions={method: "POST",
            headers: head,
            body: JSON.stringify({ titre : titre.value ,
                                   qtestock : qtestock.value ,
                                   prix : prix.value })}
        fetch("https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres",fetchOptions)
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
    <div>
        <p id="titr">{{titre}}</p>
        <p id="qte">{{qtestock}}</p>
        <p id="prix">{{prix}}</p>
    </div>
</template>

<style scoped>
div {
  display:block; background: #555555;
  width: 150px; height:200px; border-radius: 10px; margin:5px 10px 5px 10px;
}

p#titr {
  color: #ffffff; text-align: center;
  text-transform: uppercase; width: 150px; font-size: 25px;
  
}
</style>
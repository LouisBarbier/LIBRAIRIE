<script setup>
    import { reactive } from "vue";
    import { onMounted } from "vue";
    import { ref } from "vue";
    
    const titre = ref(""); /*permet d'obtenir ce qui est écrit dans l'input Titre*/
    let listeT = reactive([]); /*liste des livres comportant la valeur de titre dans leur titre*/

    const emit = defineEmits(["recherche"]); /*évènement indiquant que l'utilisateur veut chercher des livre à partir de leur titre*/
    
    function handlerSubmit() { /*Envoie l'évènement "recherche" en indiquant qu'elle suite de caractère doivent contenir les livres recherchés*/
        emit("recherche",titre.value);
    }

    function actionTitre (){ /*Permet de remplir listeT à chaque modification de l'input Titre*/
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

    onMounted(() => { /*Permet de d'appeler actionTitre au lancement du mode Recherche (l'input Titre étant vide tout les livres de la librairie seront placé dans listeT)*/
    actionTitre();
    });

    const selec = ref("") /*permet d'obtenir quel titre est sélectionné dans dans la "barre de sélection" (dans le select)*/
    function selection () { /*Permet de remplacé ce qui été déjà marqué dans l'input Titre par ce qui a été sélectionné (Ce qui permet à l'utilisateur de mieux voir ce qu'il a sélectionné et Cela permet également le bon fonctionnement de l'appel de la fonction handlerSubmit() dans cette même fonction)*/
        titre.value=selec.value;
        handlerSubmit()
    }
</script>

<template>
    <form @submit.prevent="handlerSubmit"> <!--Barre de recherche-->
        <input id="titr" type="text" v-model="titre" placeholder="Nom du livre" @input="actionTitre"/> <!--case pour la suite de caractère recherché-->
        <select v-model="selec" @change="selection"> <!--select dont les options sont les livres dont le titre contient la suite de caractère renseigné dans l'input Titre, lorsqu'on selection un livre parmi les options cela affiche ce livre-->
            <option v-for="(livre) of listeT">{{ livre.titre }}</option>
        </select>
        <input id="sub" type="submit" value="&#128269;" aria-label="RECHERCHER"/>  <!--Bouton pour recherché les livres dont le titre contient la suite de caractère renseigné dans l'input Titre-->
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
<script setup>
    import { reactive } from "vue";
    import { onMounted } from "vue";

    import Livre from "./Livre.vue";
    import Rechercheur from "./Rechercheur.vue";
    import LivreClass from "../LivreClass";

    const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres";
    let listeL = reactive([]); /*Liste contenant les diffèrents livres affichés*/

    function getLivres(titr) { /*Permet de remplir listeL, titr n'est pas un argument obligatoire*/
        const fetchOptions = { method: "GET" };
        if (titr!=null){ /*Si on a donné un titr on ne met dans listeL que les livres contenant titr dans leur titre*/
            titr="?search="+titr;
        }
        else { /*Si on n'a pas donné de titr on met dans listeL tout les livres de la  librairie (donc tout ceux qui contiennent "" dans leur titre)*/
            titr="";
        }
        fetch(url+titr, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                listeL.splice(0, listeL.length);
                dataJSON.forEach((v) =>
                    listeL.push(new LivreClass(v.id, v.titre, v.qtestock, v.prix))
                );
            })
            .catch((error) => console.log(error));
    }
    onMounted(() => { /*Permet d'exéxuter getLivres au lancement du mode Recherche*/
    getLivres();
    });

    function handlerDelete(idx) { /*Supprime le Livre à l'index idx de listeL de la librairie*/
    const fetchOptions={method: "DELETE"}
    fetch(url+"/"+listeL[idx].id,fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            getLivres()
        })
        .catch((error) =>
            console.log(error)
        )
    }

    function handlerAdd1(idx) { /*Ajoutte 1 livre à la quantité en stock du Livre à l'index idx de listeL*/
        const head=new Headers()
        head.append("Content-Type", "application/json")
        const fetchOptions={method: "POST",
            headers: head,
            body: JSON.stringify({ titre : listeL[idx].titre ,
                                   qtestock : 1 ,
                                   prix : listeL[idx].prix })}
        fetch(url,fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                getLivres()
            })
            .catch((error) =>
                console.log(error)
            )
    }

    function handlerDel1(idx) { /*Retire 1 livre à la quantité en stock du Livre à l'index idx de listeL*/
        if (listeL[idx].qtestock-1>0){
            const head=new Headers()
            head.append("Content-Type", "application/json")
            const fetchOptions={method: "POST",
                headers: head,
                body: JSON.stringify({ titre : listeL[idx].titre ,
                                    qtestock : -1 ,
                                    prix : listeL[idx].prix })}
            fetch(url,fetchOptions)
                .then((response) => {
                    return response.json();
                })
                .then((dataJSON) => {
                    getLivres()
                })
                .catch((error) =>
                    console.log(error)
                )
        } else {
            handlerDelete(idx);
        }
    }
</script>

<template>
    <Rechercheur @recherche="getLivres"></Rechercheur> <!--Barre de recherche-->
    <div></div> <!--Trait séparant la Barre de recherche des livres-->
    <ul> <!--Liste des livres affiché-->
        <Livre
            v-for="(livre, index) of listeL"
            :key="livre.id"
            :livre="livre"
            :indexl="index"
            @deletel="handlerDelete"
            @add1="handlerAdd1"
            @del1="handlerDel1"
        />
    </ul>
</template>

<style scoped>
ul {
    position: relative; top: 156px;
}
div {
    border-top: 1px solid #2c2c2c; width: 950px; position: absolute; top: 173px; left: 135px;
}
</style>
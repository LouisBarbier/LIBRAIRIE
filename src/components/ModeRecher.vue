<script setup>
    import { reactive } from "vue";
    import { onMounted } from "vue";

    import Livre from "./Livre.vue";
    import Rechercheur from "./Rechercheur.vue";
    import LivreClass from "../LivreClass";

    const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres";
    let listeL = reactive([]);
    function getLivres() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
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
    onMounted(() => {
    getLivres();
    });

    function handlerDelete(idx) {
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

    function handlerAdd1(idx) {
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

    function handlerDel1(idx) {
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

    function handlerRecherche (listeT){
        listeL.splice(0, listeL.length);
        listeT.forEach((v) =>
            listeL.push(new LivreClass(v.id, v.titre, v.qtestock, v.prix))
        );
    }
</script>

<template>
    <h3>Liste des livres</h3>
    <Rechercheur @recherche="handlerRecherche"></Rechercheur>
    <ul>
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
</style>
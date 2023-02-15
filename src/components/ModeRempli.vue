<script setup>
    import Remplisseur from "./Remplisseur.vue";

    function handlerAdd(titre,qtestock,prix) {
        const head=new Headers()
        head.append("Content-Type", "application/json")
        const fetchOptions={method: "POST",
            headers: head,
            body: JSON.stringify({ titre : titre ,
                                   qtestock : qtestock ,
                                   prix : prix })}
        fetch("https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres",fetchOptions)
            .catch((error) =>
                console.log(error)
            )
    }
</script>

<template>
    <Remplisseur @addl="handlerAdd"></Remplisseur>
</template>

<style scoped>
</style>
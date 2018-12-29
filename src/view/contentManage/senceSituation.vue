<template>
  <router-view></router-view>
  <!--<situation-introduce></situation-introduce>-->
  <!--<situation-img></situation-img>-->
  <!--<situation-depart></situation-depart>-->

</template>

<script>
  import SituationIntroduce from "./situationIntroduce";
  import SituationImg from "./situationImg";
  import SituationDepart from "./situationDepart";
  export default {
    name: "senceSituation",
    components: {SituationDepart, SituationImg, SituationIntroduce},
    mounted(){
       console.log( this.$route.meta)
    }
  }
</script>

<style scoped>

</style>

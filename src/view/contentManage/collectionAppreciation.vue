<template>
  <appreciation-show></appreciation-show>
  <!--<appreciation-strory></appreciation-strory>-->
  <!--<situation-img></situation-img>-->
</template>

<script>
    import AppreciationShow from "./appreciationShow";
    import AppreciationStrory from "./appreciationStrory";
    import SituationImg from "./situationImg";
    export default {
        name: "collectionAppreciation",
      components: {SituationImg, AppreciationStrory, AppreciationShow}
    }
</script>

<style scoped>

</style>

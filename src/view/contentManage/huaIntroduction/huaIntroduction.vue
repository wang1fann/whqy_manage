<template>
  <router-view></router-view>
    <!--<hua-word></hua-word>-->
  <!--<hua-video></hua-video>-->
  <!--<hua-video-append></hua-video-append>-->
</template>

<script>
    import HuaWord from "./huaWord";
    import HuaVideo from "./huaVideo";
    import HuaVideoAppend from "./huaVideoAppend";
    export default {
        name: "huaIntroduction",
      components: {HuaVideoAppend, HuaVideo, HuaWord}
    }
</script>

<style scoped>

</style>

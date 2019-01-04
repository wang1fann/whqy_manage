<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import API from "@/api/api_site";
import { mapState } from "vuex";
export default {
  computed: {},
  name: "App",
  created() {
    // this.getMenuList();
  },
  methods: {
    // getMenuList() {
    //   API.findMenuList().then(res => {
    //     console.log(res);
    //     if (!!res && res.code === 20000) {
    //       console.log(this.$router); //this.$router.options.routes
    //       for (var i = 0; i < res.data.length; i++) {
    //         res.data[i].component = resolve => {
    //           require([res.data[i].component], resolve);
    //         };
    //       }
    //       this.$router.options.routes[1].children[3].children = res.data;
    //       console.log(this.$router.options);
    //     }
    //   });
    // }
  }
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
  min-width: 1125px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.imglogo {
  width: 100px;
  height: auto;
}
</style>

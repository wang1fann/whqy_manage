<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {},
  name: "App",
  created() {
  },
  methods: {
  
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


<template>
  <el-row class="components-container">
    <my-uepage :titleVal="titleVal" @content="submitcontent"></my-uepage>
  </el-row>
</template>
<style>
.info {
  border-radius: 10px;
  line-height: 20px;
  padding: 10px;
  margin: 10px;
  background-color: #ffffff;
}
</style>
<script>
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      titleVal: "表示梯三",
    };
  },
  created() {
    // this.getUEContent();
  },
  methods: {
    // getUEContent() {
    //   let content = this.$refs.ue.getUEContent();
    //   console.log(content);
    // }
    submitcontent(content){
        console.log(content);
        console.log(this.titleVal);
    }
  }
};
</script>
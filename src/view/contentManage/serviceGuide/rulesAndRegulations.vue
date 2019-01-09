
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      @submit="submitcontent"
      @imgPath="getImgPath"
    ></my-uepage>
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
import API from "@/api/api_abstract";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      ticketForm: {
        title: "",
        imgPath: "",
        menuId: this.$route.query,
        description: "",
        content: ""
      }
    };
  },
  created() {},
  methods: {
    submitcontent(content) {
      console.log(content);
      this.ticketForm.content = content;
      console.log(this.ticketForm);
      window.sessionStorage.setItem("responseType", "json");
      API.addServerInfo(this.ticketForm).then(res => {
        console.log(res);
        this.$message({
          type:"success",
          message:res.message
        });
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = val.replace(/\\/g, "/");
    }
  }
};
</script>

<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :showMp4="showMp4"
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
        title: "表示梯三",
        imgPath: "",
        menuId: this.$route.query.menuId,
        description: "",
        content: ""
      },
      showMp4:true
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitcontent(content) {
      this.ticketForm.content = content;
      console.log(this.ticketForm);
      window.sessionStorage.setItem("responseType", "json");
      API.addServerInfo(this.ticketForm).then(res => {
        console.log(res);
        this.$message({
          type: !!res && res.code === 20000 ? "success" : "warning",
          message: res.message
        });
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = val.replace(/\\/g, "/");
    }
  }
};
</script>
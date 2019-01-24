
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :defaultMsg="ticketForm.content"
      :fullscreenLoading="fullscreenLoading"
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
      fullscreenLoading: false,
      ticketForm: {
        title: "",
        imgPath: "",
        menuId: this.$route.query.menuId + "",
        description: "",
        content: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    submitcontent(content) {
      this.ticketForm.content = content;
      window.sessionStorage.setItem("responseType", "json");
      API.addServerInfo(this.ticketForm).then(res => {
        this.$message({
          type: !!res && res.code === 20000 ? "success" : "warning",
          message: res.message
        });
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getData() {
      this.fullscreenLoading = true;
      API.findfuwuzhinan({ menuId: this.ticketForm.menuId }).then(res => {
        if (!!res && res.code === 20000) {
          this.ticketForm = res.data.rows[0];
        }
        var that = this;
        setTimeout(() => {
          that.$message({
            type: !!res && res.code === 20000 ? "success" : "warning",
            message: res.message
          });
          that.fullscreenLoading = false;
        }, 1000);
      });
    }
  }
};
</script>
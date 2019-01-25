
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :showMp4="true"
      :defaultMsg="ticketForm.content"
      :fullscreenLoading="fullscreenLoading"
      @submit="submitcontent"
      @imgPath="getImgPath"
      @uploadPath="getMp4Path"
    ></my-uepage>
  </el-row>
</template>
<script>
import API from "@/api/api_weihuajiangtang";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      fullscreenLoading: false,
      ticketForm: {
        title: "",
        imgPath: "",
        menuId: !!this.$route.query.menuId
          ? this.$route.query.menuId + ""
          : this.$route.name,
        description: "",
        content: "",
        uploadPath: ""
      }
    };
  },
  created() {
    this.getUpdate();
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
        if (!!res && res.code === 20000) {
          var that = this;
          setTimeout(function() {
            that.$router.go(-1);
          }, 1000);
        }
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getMp4Path(val) {
      this.ticketForm.uploadPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getUpdate() {
      this.fullscreenLoading = true;
      this.ticketForm = this.$route.query;
      var that = this;
      setTimeout(() => {
        that.fullscreenLoading = false;
      }, 100);
    }
  }
};
</script>
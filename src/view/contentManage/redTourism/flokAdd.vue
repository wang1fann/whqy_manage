
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :showScenicSpotName="true"
      :showTitle="false"
      :defaultMsg="ticketForm.content"
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
import API from "@/api/api_abstract.js";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      ticketForm: {
        imgPath: "",
        menuId: this.$route.query.menuId + "",
        description: "",
        scenicSpotName: "",
        content: ""
      }
    };
  },
  created() {
    this.getUpdate();
  },
  methods: {
    getUpdate() {
      this.ticketForm = !!this.$route.query
        ? this.$route.query
        : this.ticketForm;
    },
    submitcontent(content) {
      this.ticketForm.content = content;
      window.sessionStorage.setItem("responseType", "json");
      API.addFormInfo(this.ticketForm).then(res => {
        this.$message({
          type: !!res && res.code === 20000 ? "success" : "warning",
          message: res.message
        });
        if (!!res && res.code === 20011) {
          //登录已过期
          localStorage.removeItem("access-user");
          localStorage.removeItem("token");
          var that = this;
          setTimeout(function() {
            that.$router.push({ path: "/login" });
          }, 2000);
          return;
        }
        if (!!res && res.code === 20000) {
          var that = this;
          setTimeout(function() {
            that.$router.go(-1);
          }, 1500);
        }
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    }
  }
};
</script>
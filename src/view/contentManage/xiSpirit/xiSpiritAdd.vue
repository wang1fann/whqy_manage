
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :defaultMsg="ticketForm.content"
      :showAuthor="false"
      :showLinkName="true"
      :fullscreenLoading="fullscreenLoading"
      :showLinkUrl="true"
      :showPersonName="true"
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
import API from "@/api/api_xiSpirit";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      fullscreenLoading: false,
      ticketForm: {
        title: "",
        imgPath: "",
        personName: "",
        linkName: "",
        linkUrl: "",
        menuId: this.$route.query.menuId + "",
        description: "",
        content: ""
      }
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    submitcontent(content) {
      this.ticketForm.content = content;
      window.sessionStorage.setItem("responseType", "json");
      API.addAPI(this.ticketForm).then(res => {
        this.$notify({
          title: "提示",
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        if (!!res && res.code === 20000) {
          var that = this;
          setTimeout(function() {
            that.$router.go(-1);
          }, 2000);
        }
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getData() {
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
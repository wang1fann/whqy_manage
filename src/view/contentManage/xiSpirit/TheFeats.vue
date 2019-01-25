
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :fullscreenLoading="fullscreenLoading"
      :defaultMsg="ticketForm.content"
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
        menuId: this.$route.query.menuId + "",
        description: "",
        personName: "",
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
      API.findFormData({ menuId: this.ticketForm.menuId }).then(res => {
        if (!!res && res.code === 20000) {
          this.ticketForm = res.data.rows[0];
        }
        this.$message({
          type: !!res && res.code === 20000 ? "success" : "warning",
          message: res.message
        });
        this.fullscreenLoading = false;
      });
    }
  }
};
</script>
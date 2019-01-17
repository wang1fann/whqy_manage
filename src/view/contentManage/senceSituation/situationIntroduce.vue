
<template>
  <el-row
    class="components-container"
    v-loading="fullscreenLoading"
  >
    <my-uepage
      :Form="ticketForm"
      :defaultMsg="ticketForm.content"
      @submit="submitcontent"
      @imgPath="getImgPath"
    ></my-uepage>
  </el-row>
</template>

<script>
import API from "@/api/api_jingqugaikuang";
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
      this.ticketForm.imgPath = val.replace(/\\/g, "/");
    },
    getData() {
      this.fullscreenLoading = true;
      API.findFormData({ menuId: this.ticketForm.menuId }).then(res => {
        if (!!res && res.code === 20000) {
          this.ticketForm = res.data.rows[0];
        }
        this.fullscreenLoading = false;
        this.$message({
          type: !!res && res.code === 20000 ? "success" : "warning",
          message: res.message
        });
      });
    }
  }
};
</script>
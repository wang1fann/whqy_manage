
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :defaultMsg="ticketForm.content"
      :showAuthor="true"
      :showAgePeriod="true"
      :showMp4="true"
      :showName="true"
      @submit="submitcontent"
      @imgPath="getImgPath"
      @uploadPath="getMp4Path"
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
import API from "@/api/api_weihuaqiyi";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      ticketForm: {
        title: "",
        imgPath: "",
        name:"",
        agePeriod:"",
        author: "",
        menuId: this.$route.query.menuId + "",
        description: "",
        content: "",
        productUploadPath:""
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
      var that = this;
      window.sessionStorage.setItem("responseType", "json");
      API.addAPI(this.ticketForm).then(res => {
        if (!!res && res.code === 20000) {
          var that = this;
          setTimeout(function() {
            that.$router.go(-1);
          }, 1000);
        }
        that.$message({
          type: !!res && res.code === 20000 ? "success" : "warning",
          message: res.message
        });
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = val.replace(/\\/g, "/");
    },
    getMp4Path(val){
      this.ticketForm.productUploadPath = val.replace(/\\/g, "/");
    },
    getData() {
      this.ticketForm = this.$route.query;
    }
  }
};
</script>

<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :defaultMsg="ticketForm.content"
      :showAuthor="false"
      :showLinkName="true"
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
      ticketForm: {
        title: "",
        imgPath: "",
        personName:"",
        linkName:"",
        linkUrl:"",
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
      console.log(this.ticketForm);
      var that= this;
      window.sessionStorage.setItem("responseType", "json");
      API.addAPI(this.ticketForm).then(res => {
        if (!!res && res.code === 20000) {
          that.$router.go(-1);
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
    getData() {
      this.ticketForm = this.$route.query;
    }
  }
};
</script>
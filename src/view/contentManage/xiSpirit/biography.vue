
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
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
      ticketForm: {
        title: "习老精神-生平简介",
        imgPath: "",
        menuId: this.$route.query.menuId+"",
        description: "",
        content: "",
        personName: "习仲勋",
        linkUrl:'www.baidu.com',
        linkName:"链接"
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitcontent(content) {
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
<template>
  <div class="">
    <common-img
      :imgList="imgList"
      :searchParams="searchParams"
      :showAuthor="false"
      @pageNum="pageNum"
      @deleteItem="confirmDeleteItem"
      @formfile="uploadFormFile"
      @formInfo="submitFormInfo"
    ></common-img>
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    ></MyConfirm>
  </div>
</template>
<script>
import commonImg from "@/view/contentManage/commonImgui";
import API from "@/api/api_abstract.js";
export default {
  name: "folk",
  components: { "common-img": commonImg },
  data() {
    return {
      id: "",
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除, 是否继续?",
      formFile: {}, //上传图片
      imgPath: "",
      searchParams: {
        page: 1,
        size: 10,
        menuId: this.$route.query.menuId+""
      },
      addFormInfo: {
        scenicSpotName: "",
        author: "",
        content: "",
        imgPath: "",
        menuId: this.$route.query.menuId+""
      },
      imgList: [
        {
          name: "渭华起义工农红军使用过的土铁枪",
          src: require("@/assets/img/content/photoe.png")
        }
      ]
    };
  },
  methods: {
    uploadFile() {
      window.sessionStorage.setItem("responseType", "form");
      API.uploadImg(this.formFile).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "error"
        });
        if (!!res && res.code === 20000) {
          this.addFormInfo.imgPath = res.data[0].replace(/\\/g, "/");
        }
        window.sessionStorage.setItem("responseType", "json");
      });
    },
    uploadFormFile(val) {
      this.formFile = val;
    },
    submitFormInfo(val) {
      this.addFormInfo = val;
      this.uploadFile();
      window.sessionStorage.setItem("responseType", "json");
      this.addFormInfo.imgPath = this.imgPath.replace(/\\/g, "/");
      this.addFormInfo.menuId = this.$route.query.menuId+"";
      console.log(this.addFormInfo);
      var that = this;
      setTimeout(function() {
        API.addFormInfo(that.addFormInfo).then(res => {
          if (!!res && res.code === 20000) {
            this.findList();
          }
          that.$message({
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "error"
          });
        });
      }, 50);
    },
    findList() {
      window.sessionStorage.setItem("responseType", "json");
      API.findhongselvyou(this.searchParams).then(res => {
        if (!!res && res.code === 20000) {
          this.imgList = res.data;
        }
        this.$message({
          message:
            !!res && res.data.total === 0
              ? "查询成功，暂无相关数据。"
              : res.message,
          type: !!res && res.code === 20000 ? "success" : "error"
        });
      });
    },
    // 取消删除
    cancle() {
      this.id = null;
    },
    deleteImg() {
      var _this = this; 
      // console.log(_this.id);
      window.sessionStorage.setItem("responseType", "json");
      API.delAbstarct({ id: _this.id })
        .then(res => {
          if (!!res && res.code === 20000) {
            this.findList();
            this.id = null;
          }
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    confirmDeleteItem(item) {
      console.log(item);
      var _this = this;
      _this.id = item.id;
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.deleteImg, _this.cancle);
      }, 100);
    },
    pageNum(val) {
      this.searchParams.page = val;
      this.findList();
    }
  },
  created() {
    this.findList();
  },
  mounted() {}
};
</script>

<style scoped>
</style>

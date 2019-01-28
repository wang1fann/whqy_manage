<template>
  <div class="">
    <common-img
      :imgList="imgList"
      :searchParams="searchParams"
      :showAuthor="false"
      :imgPath="imgPath"
      :show.sync="show"
      :showImgLoading="showImgLoading"
      @show="open"
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
import API from "@/api/api_weihuaqiyi.js";
export default {
  name: "folk",
  components: { "common-img": commonImg },
  data() {
    return {
      show: false,
      id: "",
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除, 是否继续?",
      formFile: {}, //上传图片
      imgPath: "",
      showImgLoading:false,
      searchParams: {
        page: 1,
        size: 9,
        menuId: this.$route.query.menuId + ""
      },
      addFormInfo: {
        title: "",
        author: "",
        content: "",
        imgPath: "",
        menuId: this.$route.query.menuId + ""
      },
      imgList: []
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
          this.imgPath = res.data[0].replace(/\\/g, "/");
        }
        window.sessionStorage.setItem("responseType", "json");
      });
    },
    uploadFormFile(val) {
      this.formFile = val;
      this.uploadFile();
    },
    submitFormInfo(val) {
      this.addFormInfo = val;
      this.addFormInfo.imgPath = this.imgPath;
      window.sessionStorage.setItem("responseType", "json");
      this.addFormInfo.menuId = this.$route.query.menuId + "";
      API.addAPI(this.addFormInfo).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "error"
        });
        if (!!res && res.code === 20000) {
          this.show = false;
          var that = this;
          setTimeout(function() {
            that.findList();
          }, 1000);
        }
      });
    },
    open() {
      this.show = true;
    },
    findList() {
      window.sessionStorage.setItem("responseType", "json");
      this.showImgLoading=true;
      API.findList(this.searchParams).then(res => {
        if (!!res && res.code === 20000) {
          this.imgList = res.data;
        }
      this.showImgLoading=false;
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
      window.sessionStorage.setItem("responseType", "json");
      API.delAPI({ id: _this.id })
        .then(res => {
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
          if (!!res && res.code === 20000) {
            this.findList();
            this.id = null;
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    confirmDeleteItem(item) {
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

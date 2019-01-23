<template>
  <div class="">
    <common-img
      :imgList="imgList"
      :searchParams="searchParams"
      :showAuthor="false"
      :imgPath="imgPath"
      :show.sync="show"
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
import API from "@/api/api_jingqugaikuang.js";
export default {
  name: "folk",
  components: { "common-img": commonImg },
  data() {
    return {
      id: "",
      show: false,
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除, 是否继续?",
      formFile: {}, //上传图片
      submitSuccess: "",
      imgPath: "",
      searchParams: {
        page: 1,
        size: 10,
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
    open() {
      this.show = true;
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
      API.addFormInfo(this.addFormInfo).then(res => {
        this.$notify({
          title: "提示",
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        if (!!res && res.code === 20011) {
          //登录已过期
          sessionStorage.removeItem("access-user");
          sessionStorage.removeItem("token");
          var that = this;
          setTimeout(function() {
            that.$router.push({ path: "/login" });
          }, 2000);
          return;
        }
        if (!!res && res.code === 20000) {
          this.show = false;
          var that = this;
          setTimeout(function() {
            that.findList();
          }, 2000);
        }
      });
    },
    findList() {
      window.sessionStorage.setItem("responseType", "json");
      API.findjingqugaikuangList(this.searchParams).then(res => {
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
      window.sessionStorage.setItem("responseType", "json");
      API.delAPI({ id: _this.id })
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

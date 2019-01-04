<template>
  <div class="content-manageappre">
    <div class="clearfix">
      <div class="l left">
        <input
          class="upload-img"
          type="file"
          @change="changeImage($event)"
          id="upload-img-input"
        >
        <div class="uplaod-bgimg">
          <img
            class="uplaod-bgimg"
            src="@/assets/img/content/photou.png"
          />
          <p>点上传击图片</p>
        </div>
      </div>
      <div
        class="l tuImg"
        v-for="(item,index) in imgList"
        :key="index"
      >
        <img :src="item.src" />
        <span @click="deleteConfirm(item)"></span>
        <p>{{item.name}}</p>
      </div>
    </div>
    <div style="margin-top:15px;">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    ></MyConfirm>
  </div>
</template>

<script>
import API from "@/api/api_user.js";
import APICommon from "@/api/api_abstract.js";

export default {
  name: "commonImgui",
  data() {
    return {
      searchParams: {
        page: 1,
        size: 10
      },
      id: "",
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除该文件, 是否继续?",
      total: 50
      //   abstractComment: {
      //     //文章评论
      //     userId: "dsa",
      //     name: "das",
      //     phone: "111",
      //     email: null,
      //     content: "dasdsa",
      //     imgPath: null,
      //     address: "dsadsad",
      //     createTime: null,
      //     updateTime: null,
      //     status: "1",
      //     description: "dasdasdsad",
      //     hongSeId: "1077409063303778304",
      //     isGood: true, //是否好评
      //     score: 9
      //   },
      //   abstractInfo: {
      //     //添加风土民俗信息
      //     scenicSpotName: "风土民俗", //景区名称
      //     openTime: "2018-01-01", //开放时间
      //     ticketPrice: "10", //门票价格
      //     phone: "029-292838444", //订票电话
      //     content: "dasdsadasd", //内容
      //     imgPath: "adssad", //图片路径
      //     busRoute: "sadsadsad", //公交路线
      //     trainTime: "asdsad", //列车时刻表
      //     sortNum: "sdsadsa", //排序号码
      //     status: "1", //状态
      //     menuId: "33", //所属菜单id
      //     description: "dasdsadsdas", //描述
      //     sugestLine: "5路", //推荐线路
      //     adress: "dsadsadsa" //地址
      //   }
    };
  },
  props: ["imgList","searchParams"],
  methods: {
    changeImage(ev) {
      let uploadImginput = document.getElementById("upload-img-input");
      let form = new FormData(uploadImginput); //拿到表单创建FormData对象；
      let files = ev.target.files; //拿到选择的文件
      console.log(files);
      form.append("menu", "风土民俗");
      form.append("file", files[0]);
      window.sessionStorage.setItem("responseType", "form");
      API.uploadUserImg(form).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "error"
        });
        if (!!res && res.code === 20000) {
          //   window.sessionStorage.setItem("responseType", "json");
          //   this.abstractInfo.imgPath = res.data[0].replace(/\\/g, "/");
          //   this.abstractInfo.menuId = 23;
          //   APICommon.addAbstarct(this.abstractInfo).then(res => {
          //     this.$message({
          //       message: res.message,
          //       type: !!res && res.code === 20000 ? "success" : "error"
          //     });
          //   });
        }
      });
    },
    deleteImg() {
      var _this = this;
      APICommon.delAbstarct({ id: _this.id })
        .then(res => {
          this.id = null;
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
          this.findMenu();
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    deleteConfirm(item) {
      var _this = this;
      console.log(item);
      _this.id = item.id;
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.deleteImg, "");
      }, 100);
    },
    findAbstract() {
      APICommon.findhongselvyou(this.searchParams).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "error"
        });
      });
    },
    handleCurrentChange(val) {
      this.searchParams.page = val;
      this.$emit("searchParams", this.searchParams);
      //   this.findAbstract();
    }
  },
  created() {
    this.findAbstract();
  },
  mounted() {}
};
</script>

<style scoped>
.l {
  float: left;
  position: relative;
}
input.upload-img {
  height: 100%;
  border: 1px solid red;
  width: 100%;
  opacity: 0;
}

.uplaod-bgimg {
  z-index: 10;
  position: absolute;
  top: 195px;
  left: 86px;
}
.uplaod-bgimg img {
  left: 14px;
  top: -61px;
  margin-top: 0px !important;
}
.content-manageappre {
  margin: 0 auto;
  margin-top: 30px;
  width: 96%;
}
.content-manageappre .left {
  width: 18%;
  height: 330px;
  background: #f0f4f7;
}
.content-manageappre .left img {
  margin: 0 auto;
  width: 40px;
  height: 30px;
  margin-top: 130px;
}
* {
  margin: 0;
  padding: 0;
}
.content-manageappre .left p {
  font-size: 12px;
  margin-top: 4px;
  color: #d8dde1;
}
.content-manageappre img {
  width: 100%;
  height: 270px;
}
.content-manageappre .tuImg {
  position: relative;
  height: 330px;
  width: 18%;
  box-sizing: border-box;
  background: #f5fafc;
  margin-left: 28px;
}
.content-manageappre .tuImg span {
  display: block;
  width: 24px;
  height: 24px;
  background: url("../../assets/img/content/cha.png") no-repeat;
  background-size: 24px auto;
  position: absolute;
  right: -11px;
  top: -11px;
  cursor: pointer;
  z-index: 20;
}
.content-manageappre .tuImg p {
  font-size: 13px;
  text-align: center;
  margin-top: 20px;
  color: #58626f;
}
</style>

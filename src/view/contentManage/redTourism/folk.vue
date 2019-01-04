<template>
  <div class="">
    <common-img
      :imgList="imgList"
      :searchParams="searchParams"
      @pageNum="pageNum"
      @imgPath="addImgPath"
      @delete="deleteInfo"
      :deleteAPI="deleteAPI"
    ></common-img>
  </div>
</template>
<script>
import commonImg from "@/view/contentManage/commonImgui";
import APICommon from "@/api/api_abstract.js";
export default {
  name: "folk",
  components: { "common-img": commonImg },
  data() {
    return {
      searchParams: {
        page: 1,
        size: 10
      },
      deleteAPI:'delAbstarct',
      abstractComment: {
        //文章评论
        userId: "dsa",
        name: "das",
        phone: "111",
        email: null,
        content: "dasdsa",
        imgPath: null,
        address: "dsadsad",
        createTime: null,
        updateTime: null,
        status: "1",
        description: "dasdasdsad",
        hongSeId: "1077409063303778304",
        isGood: true, //是否好评
        score: 9
      },
      abstractInfo: {
        //添加风土民俗信息
        scenicSpotName: "风土民俗", //景区名称
        openTime: "2018-01-01", //开放时间
        ticketPrice: "10", //门票价格
        phone: "029-292838444", //订票电话
        content: "dasdsadasd", //内容
        imgPath: "adssad", //图片路径
        busRoute: "sadsadsad", //公交路线
        trainTime: "asdsad", //列车时刻表
        sortNum: "sdsadsa", //排序号码
        status: "1", //状态
        menuId: "33", //所属菜单id
        description: "dasdsadsdas", //描述
        sugestLine: "5路", //推荐线路
        adress: "dsadsadsa" //地址
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
    addImgPath(val) {
      window.sessionStorage.setItem("responseType", "json");
      this.abstractInfo.imgPath = val.replace(/\\/g, "/");
      this.abstractInfo.menuId = 23;
      APICommon.addAbstarct(this.abstractInfo).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "error"
        });
      });
    },
    findAbstract() {
      APICommon.findhongselvyou(this.searchParams).then(res => {
        if (!!res && res.code === 20000) {
          this.imgList = res.data;
        }
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "error"
        });
      });
    },
    deleteInfo(res) {
      if (!!res && res.code === 20000) {
          this.findAbstract();
      }else{
          return;
      }
    },
    pageNum(val) {
      this.searchParams.page = val;
      this.findAbstract();
    }
  },
  created() {
    this.findAbstract();
  },
  mounted() {}
};
</script>

<style scoped>
</style>

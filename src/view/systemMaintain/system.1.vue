
<template>
  <div class="system content-top-line">
    <div class="tabs clearfix">
      <div
        class="sys-main"
        v-for="(item,index) in systemUrl"
        :key="index"
      >
        <div
          class="box"
          @click="gotoUrl(item.path,'',index)"
        >
          <img
            class="item-img"
            :src="item.img"
          >
          <img
            class="item-bg"
            :src="item.bg"
            alt=""
          >
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ElBread from "@/components/ElBread"; //面包屑
export default {
  name: "contentManage",
  components: {
    "el-bread": ElBread
  },
  data() {
    return {
      systemUrl: ""
    };
  },
  created() {
    this.getSystemUrl();
  },
  methods: {
    gotoUrl(path, query, index) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
    },
    getSystemUrl() {
      this.systemUrl = this.$router.options.routes[1].children;
      this.systemUrl = this._.filter(this.systemUrl, { class: "sys" });
      console.log(this.systemUrl);
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.tabs {
  position: relative;
}

.sys-main:first-child {
  // margin-left: 10px;
}

.sys-main {
  margin-top: 100px;
  float: left;
  width: 33.33%;
  .box {
    cursor: pointer;
    position: relative;
    span {
      position: absolute;
      top: 174px;
      left: 29%;
      font-size: 23px;
      color: #fff;
      z-index: 16;
    }
  }
  img {
    position: absolute;
    top: 0px;
    left: 0px;
    &.item-bg {
      width: 430px;
      height: 229px;
    }
    &.item-img {
      width: 60px;
      height: 60px;
      padding: 5px;
      border-radius: 50%;
      top: 85px;
      left: 31%;
      z-index: 10;
      border: 1px solid #fff;
    }
  }
}
</style>

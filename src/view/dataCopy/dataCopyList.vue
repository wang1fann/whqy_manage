<template>
  <div class="content-top-line">
    <div class="data-list">
      <div class="data-type-button">
        <el-button
          round
          type="danger"
          style="margin:0px 50px;padding: 5px 25px;border-radius:30px;"
        > <img
            class="my-button-img"
            src="@/assets/img/data/The snapshot duty.png"
            alt=""
          > <span class="my-button-span">数据备份</span></el-button>
        <button
          class="restore-button"
          @click="gotoUrl('/dataRestore')"
          @mouseover="pic = pic2"
          @mouseout="pic = pic1"
        >
          <img
            class="my-button-img"
            :src="pic"
          />
          <span class="my-button-span">数据还原</span></button>
      </div>
      <el-row>
        <el-radio-group v-model="dataCopyType">
          <el-radio label="手动备份">手动备份</el-radio>
          <el-radio label="自动备份">自动备份</el-radio>
        </el-radio-group>
      </el-row>
      <el-row>
        <img
          style="width: 400px;margin: 20px auto; height: auto;"
          src="@/assets/img/data/illustrations.png"
          alt=""
        >
      </el-row>
      <el-row
        style="margin-top:20px;"
        :gutter="20"
        class="my-redbutton"
      >
        <el-button @click="submitcopyData()">开始备份</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import API from "@/api/api_data.js";
export default {
  data() {
    return {
      pic: require("@/assets/img/data/The backup1.png"),
      pic1: require("@/assets/img/data/The backup1.png"),
      pic2: require("@/assets/img/data/restore.png"),
      id: "",
      dataCopyType: "手动备份"
    };
  },
  created: function() {},
  mounted: function() {},
  methods: {
    gotoUrl(path, query) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
    },
    submitcopyData() {
      API.restore({ "type": this.dataCopyType === "手动备份" ? 1 : "2" }).then(
        res => {
          //dbbackup,type:1手动，2自动
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
        }
      );
    }
  }
};
</script>

<style  lang="scss" scoped>
.restore-button {
  outline: none;
  margin: 0px 50px;
  padding: 5px 25px;
  border-radius: 30px;
  background: #f2f4f4;
  border: 1px solid #f2f4f4;
  color: #000;
}
.restore-button:hover {
  cursor: pointer;
  color: #fff;
  background: #eb5e5f;
}
.data-list {
  width: 75%;
  margin: 0 auto;
  .data-type-button {
    margin: 50px auto;
    .my-button-img {
      margin-top: 9px;
    }
    .my-button-span {
      position: relative;
      top: -6px;
      margin-left: 10px;
      line-height: 25px;
    }
  }
}
</style>

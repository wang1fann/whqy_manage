<template>
  <div
    class="content-top-line"
    v-loading="fullscreenLoading"
  >
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
        <el-button
          v-if="dataCopyType==='手动备份'"
          @click="submitcopyData()"
        >开始备份</el-button>
        <el-tooltip
          :content="'Switch value: ' + dataCopyType"
          placement="top"
          v-else-if="dataCopyType==='自动备份'"
        >
          <el-switch
            v-model="autoCopyValue"
            active-color="#eb5e5f"
            inactive-color="#C1C1C1"
            active-value="ON"
            inactive-value="OFF"
            @change="changeAutoCopyValue"
          >
          </el-switch>
        </el-tooltip>
      </el-row>
    </div>
  </div>
</template>

<script>
import API from "@/api/api_data.js";
export default {
  data() {
    return {
      fullscreenLoading: false,
      pic: require("@/assets/img/data/The backup1.png"),
      pic1: require("@/assets/img/data/The backup1.png"),
      pic2: require("@/assets/img/data/restore.png"),
      id: "",
      dataCopyType: "手动备份",
      autoCopyValue: false
    };
  },
  created: function() {},
  watch: {
    dataCopyType: "dataCopyTypeChange"
  },
  mounted: function() {},
  methods: {
      dataCopyTypeChange() {
      // 查询自动备份状态
      API.searchAutoRestore().then(res => {
        this.autoCopyValue =
          !!res && res.code === 20000 && !!res.data.IS_AUTOMATIC_SCHEDULER_START
            ? "ON"
            : "OFF";
        this.$message({
          message: res.message,
          type: res.code === 20000 ? "success" : "error"
        });
      });
    },
    gotoUrl(path, query) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
    },
    submitcopyData() {
      this.fullscreenLoading = true;
      API.restore({ type: this.dataCopyType === "手动备份" ? "1" : "2" }).then(
        res => {
          this.fullscreenLoading = false;
          //dbbackup,type:1手动，2自动
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
        }
      );
    },
  
    changeAutoCopyValue(val) {
      window.sessionStorage.setItem("responseType", "json");
      API.backupturnon({ type: 2 + "", status: val }).then(res => {
        this.$message({
          message: res.message,
          type: res.code === 20000 ? "success" : "error"
        });
        this.dataCopyTypeChange();
      });
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

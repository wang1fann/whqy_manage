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
            src="../../assets/img/data/The snapshot duty.png"
            alt=""
          > <span class="my-button-span">数据备份</span></el-button>
        <button
          class="restore-button"
          @click="gotoUrl('/dataRestore')"
        ><img
            class="my-button-img"
            src="../../assets/img/data/The backup1.png"
            alt=""
          > <span class="my-button-span">数据还原</span></button>
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
          src="../../assets/img/data/illustrations.png"
          alt=""
        >
      </el-row>
      <el-row
        class="my-startcopy-box"
        :gutter="20"
      >
        <el-col :span="3">数据备份到：</el-col>
        <el-col :span="17">
          <el-input
            placeholder="请输入文件路径内容"
            v-model="filePath"
            clearable
          >
            <template
              slot="append"
              style="background:red;"
            >开始备份</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row
        style="margin-top:20px;"
        :gutter="20"
      >
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="17" style="padding-right:0px;padding-left:0px;">
          <el-progress
            :percentage="percentageInfo.percentage"
            :status="percentageInfo.status"
          ></el-progress>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      filePath: "",
      dataCopyType: "手动备份",
      percentageInfo: {
        percentage: 50,
        status: "exception"
      }
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
    preview(event) {
      let files = document.getElementById(this.id).files[0];
      this.imgDataUrl = this.getObjectURL(files);
      this.$emit("sendImgUrl", this.imgDataUrl, this.id);
    },
    download(text, name, type) {
      var a = document.getElementById("a");
      var file = new Blob([text], { type: type });
      a.href = URL.createObjectURL(file);
      a.download = name;
      a.dispatchEvent(
        new MouseEvent("click", { bubbles: false, cancelable: true })
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
  //   border: 1px solid red;
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

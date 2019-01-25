<template>
  <el-row class="uepage-container">
    <!-- v-loading="fullscreenLoading"
    element-loading-text="拼命加载中..." -->
    <!-- 上传封面图片 -->
    <el-row
      :gutter="24"
      v-show="showImg"
      v-loading="imgLoading"
      element-loading-text="拼命加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <el-col :span="5">
        <el-upload
          class="avatar-uploader"
          action="/syx/file/multipleUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="true"
          :http-request="uploadUserImg"
        >
          <i class="el-icon-plus avatar-uploader-icon"><span
              style="font-size:14px;position: absolute;left: 43px;color:#000;"
              class="alignright"
            >上传图片：</span></i>
          <img
            v-if="Form.imgPath!==''"
            :src="Form.imgPath"
            class="avatar"
          >
        </el-upload>
      </el-col>
      <el-col :span="19">
        <div
          class="alignleft"
          style="margin-top: 22px;"
        >
          <span>点击左图上传封面图片</span><br />
          <span class="spec">要求：</span><br />
          <span>1.建议图片比例 3:1</span><br />
          <span>2.图片大小 20MB以下</span><br />
          <span>3.图片格式 .jpg、.jpeg、.png等 </span><br />
        </div>
      </el-col>
    </el-row>
    <!-- 上传视频mp4或pdf -->
    <!-- 上传视频mp4或pdf -->
    <el-row
      :gutter="24"
      v-show="showMp4"
      v-loading="mp4Loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-col :span="8">
        <el-upload
          class="avatar-uploader"
          action="/syx/file/multipleUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccessMp4"
          :before-upload="beforeAvatarUploadMp4"
          :auto-upload="true"
          :http-request="uploadMp4"
        >
          <i
            v-if="showDownloadPath==false"
            class="el-icon-plus avatar-uploader-icon mp4-i"
          ><span
              style="font-size:14px;position: absolute;left: 43px;color:#000;"
              class="alignright"
            >上传视频：</span></i>
          <i
            v-if="showDownloadPath==true"
            class="el-icon-plus avatar-uploader-icon mp4-i"
          ><span
              style="font-size:14px;position: absolute;left: 43px;color:#000;"
              class="alignright"
            >上传文件：</span></i>
          <div v-if="showDownloadPath==false">
            <div
              class="my-video"
              v-show="!!uploadPath"
            >
              <video
                ref='mp4video'
                :src="uploadPath"
                width="320"
                height="150"
                controls
              >
                您的浏览器不支持 video元素。</video>
            </div>
          </div>
          <div v-if="showDownloadPath==true">
            <div
              class="my-video"
              v-if="!!downloadPath"
            >
              <pdf
                :src="downloadPath"
                :page="1"
              ></pdf>
            </div>
          </div>
        </el-upload>
      </el-col>
      <el-col :span="16">
        <div
          class="alignleft"
          style="margin-top: 22px;"
          v-if="showDownloadPath==false"
        >
          <span>点击左图上传视频</span><br />
          <span class="spec">要求：</span><br />
          <span>1.视频格式Mp4、WebM、Ogg等</span><br />
        </div>
        <div
          class="alignleft"
          style="margin-top: 22px;"
          v-if="showDownloadPath==true"
        >
          <span>点击左图上传pdf文件</span><br />
          <span class="spec">要求：</span><br />
          <span>1.文件格式：pdf</span><br />
        </div>
      </el-col>
    </el-row>
    <!--scenicSpotName  -->
    <el-row
      class="info"
      :gutter="24"
      v-show="showScenicSpotName"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        标题：
      </el-col>
      <el-col :span="22">
        <el-input
          placeholder="请输入标题"
          v-model="Form.scenicSpotName"
        >
        </el-input>
      </el-col>
    </el-row>
    <!-- title -->
    <el-row
      class="info"
      :gutter="24"
      v-show="showTitle"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        标题：
      </el-col>
      <el-col :span="22">
        <el-input
          placeholder="请输入标题"
          v-model="Form.title"
        >
        </el-input>
      </el-col>
    </el-row>
    <!-- personName -->
    <el-row
      class="info"
      :gutter="24"
      v-show="showPersonName"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        人物姓名：
      </el-col>
      <el-col :span="22">
        <el-input
          placeholder="请输入姓名"
          v-model="Form.personName"
        >
        </el-input>
      </el-col>
    </el-row>
    <!-- author -->
    <el-row
      class="info"
      :gutter="24"
      v-show="showAuthor"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        作者：
      </el-col>
      <el-col :span="22">
        <el-input
          placeholder="请输入作者"
          v-model="Form.author"
        >
        </el-input>
      </el-col>
    </el-row>
    <!-- 姓名 -->
    <el-row
      class="info"
      :gutter="24"
      v-show="showName"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        姓名：
      </el-col>
      <el-col :span="22">
        <el-input
          placeholder="请输入姓名"
          v-model="Form.name"
        >
        </el-input>
      </el-col>
    </el-row>
    <!-- 生卒 -->
    <el-row
      class="info"
      :gutter="24"
      v-show="showAgePeriod"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        生卒：
      </el-col>
      <el-col :span="22">
        <el-input
          placeholder="请输入姓名"
          v-model="Form.agePeriod"
        >
        </el-input>
      </el-col>
    </el-row>
    <!-- 友情链接 -->
    <el-row
      class="info"
      :gutter="24"
      v-show="showLinkUrl"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        友情链接：
      </el-col>
      <el-col :span="22">
        <el-input
          placeholder="请输入链接地址"
          v-model="Form.linkUrl"
        >
        </el-input>
      </el-col>
    </el-row>
    <!-- 链接名称 -->
    <el-row
      class="info"
      :gutter="24"
      v-show="showLinkName"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        友情名称：
      </el-col>
      <el-col :span="22">
        <el-input
          placeholder="请输入链接地址"
          v-model="Form.linkName"
        >
        </el-input>
      </el-col>
    </el-row>
    <!-- 描述 -->
    <el-row
      class="info"
      :gutter="24"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        描述：
      </el-col>
      <el-col :span="22">
        <el-input
          placeholder="请输入描述信息"
          v-model="Form.description"
        >
        </el-input>
      </el-col>
    </el-row>

    <el-row
      class="info"
      :gutter="20"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        文章内容：
      </el-col>
      <el-col :span="22">
        <UE
          @ready="editorReady"
          ref="ue"
          :fullscreenLoading="fullscreenLoading"
          :value="defaultMSG"
          style="width:100%;"
        ></UE>
      </el-col>
    </el-row>
    <el-row
      style="margin-top:20px;"
      :gutter="20"
      class="my-redbutton"
    >
      <el-button @click="getUEContent">提交</el-button>
    </el-row>
  </el-row>
</template>

<script>
import UE from "@/components/myEdit";
import pdf from "vue-pdf";
import API from "@/api/api_user.js";
export default {
  components: { UE, pdf },
  props: {
    Form: {
      type: Object,
      default: function() {
        return {
          content: "",
          title: "",
          description: "",
          imgPath: "",
          menuId: !!this.$route.query.menuId
            ? this.$route.query.menuId + ""
            : this.$route.name,
          personName: "",
          linkUrl: "",
          linkName: "",
          name: "",
          agePeriod: "",
          uploadPath: ""
        };
      }
    },
    showMp4: {
      type: Boolean,
      default: false
    },
    showDownloadPath: {
      type: Boolean,
      default: false
    },
    showImg: {
      type: Boolean,
      default: true
    },
    showLinkUrl: {
      type: Boolean,
      default: false
    },
    fullscreenLoading: {
      type: Boolean,
      default: true
    },
    showLinkName: {
      type: Boolean,
      default: false
    },
    showScenicSpotName: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showPersonName: {
      type: Boolean,
      default: false
    },
    showAuthor: {
      type: Boolean,
      default: false
    },
    showName: {
      type: Boolean,
      default: false
    },
    showAgePeriod: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mp4Loading: false,
      imgLoading: false,
      defaultMSG: null,
      imgPath: "",
      uploadPath: "",
      downloadPath: "",
      mp4Data: {
        file: {
          type: File,
          default: () => {
            return new FormData();
          }
        },
        menu: !!this.$route.query.menuId
          ? this.$route.query.menuId + ""
          : this.$route.name
      },
      imgData: {
        file: {
          type: File,
          default: () => {
            return new FormData();
          }
        },
        menu: !!this.$route.query.menuId
          ? this.$route.query.menuId + ""
          : this.$route.name
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.uploadPath = !!this.$route.query.uploadPath
        ? this.$route.query.uploadPath
        : "";
      this.downloadPath = !!this.$route.query.downloadPath
        ? this.$route.query.downloadPath
        : "";
    },
    editorReady(instance) {
      var that = this;
      setTimeout(function() {
        !!that.Form.content
          ? instance.setContent(that.Form.content)
          : instance.placeholder("请输入。。。");
        instance.addListener("contentChange", () => {
          that.Form.content = instance.getContent();
        });
      }, 300);
    },
    getUEContent() {
      if (this.Form.content === "") {
        this.$message({
          type: "warning",
          message: "请输入内容"
        });
        return;
      } else {
        this.$emit("submit", this.Form.content);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/JPG";
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error("上传图片只能是 jpg、jpeg 、png格式!");
      }
      if (!isLt20M) {
        this.$message.error("上传图片大小不能超过20MB!");
      }
      if (!isJPG || !isLt20M) {
        return isJPG && isLt20M;
      }
      this.imgData.file = file;
    },
    // 检测上传视频格式MP4
    beforeAvatarUploadMp4(file) {
      var isMp4;
      if (!!this.showDownloadPath) {
        isMp4 = file.type === "application/pdf";
      } else {
        isMp4 =
          file.type === "video/mp4" ||
          file.type === "video/webm" ||
          file.type === "video/ogg";
      }
      if (!isMp4) {
        var mes = !!this.showDownloadPath
          ? "上传格式只能是pdf格式!"
          : "上传格式只能是 Mp4、webm、ogg格式!";
        this.$message.error(mes);
        return isMp4;
      }
      this.mp4Data.file = file;
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imgPath = URL.createObjectURL(file.raw);
    },
    // 上传视频
    handleAvatarSuccessMp4(res, file) {
      this.uploadPath = URL.createObjectURL(file.raw);
    },
    uploadUserImg() {
      var form = new FormData();
      form.append("menu", this.imgData.menu);
      form.append("file", this.imgData.file);
      window.sessionStorage.setItem("responseType", "form");
      this.imgLoading = true;
      API.uploadUserImg(form).then(res => {
        this.imgLoading = false;
        if (!!res && res.code === 20000) {
          this.imgPath = !!res.data ? res.data[0] : "";
          this.$emit("imgPath", this.imgPath);
        }
        this.$message({
          message: res.message,
          type: res.code === 20000 ? "success" : "error"
        });
        window.sessionStorage.setItem("responseType", "json");
      });
    },
    uploadMp4() {
      var form = new FormData();
      form.append("menu", this.mp4Data.menu);
      form.append("file", this.mp4Data.file);
      window.sessionStorage.setItem("responseType", "form");
      this.mp4Loading = true;
      API.uploadUserImg(form).then(res => {
        this.mp4Loading = false;
        window.sessionStorage.setItem("responseType", "json");
        if (!!res && res.code === 20000) {
          this.uploadPath = !!res.data ? res.data[0] : "";
          if (!!this.$refs.mp4video) {
            this.$refs.mp4video.src = this.uploadPath;
          } else {
            this.downloadPath = this.uploadPath;
          }
          this.$emit("uploadPath", this.uploadPath);
        }
        this.$message({
          message: res.message,
          type: res.code === 20000 ? "success" : "error"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.uepage-container {
  .info {
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
  i.el-icon-plus.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    margin-bottom: 10px;
  }
  i.el-icon-plus.avatar-uploader-icon.mp4-i {
    width: 320px;
  }
  .avatar {
    max-width: 140px;
    height: 140px;
    left: 138px;
    top: 0px;

    position: absolute;
  }
  .avatar-uploader {
    text-align: left;
    margin-left: 125px;
  }
  .my-video {
    position: absolute;
    top: 0px;
    left: 138px;
    height: 150px;
    //  z-index: 100;
  }
  .el-upload.el-upload--text {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
</style>
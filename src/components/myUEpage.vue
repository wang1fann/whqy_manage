
<template>
  <el-row class="uepage-container">
    <el-row
      class="info"
      :gutter="24"
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
    <!-- 上传封面图片 -->
    <el-upload
      class="avatar-uploader"
      action="http://192.168.0.110:9104/syx/file/multipleUpload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :auto-upload="true"
      :http-request="uploadUserImg"
    >
      <i class="el-icon-plus avatar-uploader-icon"><span
          style="font-size:14px;position: absolute;left: 0px;"
          class="alignright"
        >上传封面图片:</span></i>
    </el-upload>
    <el-row
      class="info"
      :gutter="20"
    >
      <el-col
        :span="2"
        class="alignright"
      >
        内容：
      </el-col>
      <el-col :span="22">
        <UE
          :defaultMsg=defaultMsg
          :config=config
          ref="ue"
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
<style>
.info {
  border-radius: 10px;
  line-height: 20px;
  padding: 10px;
  margin: 10px;
  background-color: #ffffff;
}
</style>
<script>
import UE from "@/components/myEdit";
import API from "@/api/api_user.js";
export default {
  components: { UE },
  props: {
    Form: {
      type: Object,
      default: function() {
        return {
          title: "",
          description: "",
          imgPath: "",
          menuId: ""
          // showUploadImg:false
        };
      }
    },

    defaultMsg: {
      type: String,
      default: "请输入文章内容"
    },
    config: {
      type: Object,
      default: function() {
        return {
          UEDITOR_HOME_URL: "static/ueditor/",
          initialFrameWidth: null,
          initialFrameHeight: 350
        };
      }
    }
  },
  data() {
    return {
      imgPath:'',
      imgData: {
        file: {
          type: File,
          default: () => {
            return new FormData();
          }
        },
        menu: "门票预订"
      }
    };
  },
  created() {
    this.getMenuId();
  },
  methods: {
    getMenuId() {
      this.imgData.menu=this.$route.query;
    },
    getUEContent() {
      let content = this.$refs.ue.getUEContent();
      console.log(content);
      this.$emit("submit", content);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (!isJPG || !isLt2M) {
        return isJPG && isLt2M;
      }
      this.imgData.file = file;
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imgPath = URL.createObjectURL(file.raw);
      this.formData.imgPath = this.imgPath;
    },
    uploadUserImg() {
      // console.log(this.imgData);
      var form = new FormData();
      form.append("menu", this.imgData.menu);
      form.append("file", this.imgData.file);
      window.sessionStorage.setItem("responseType", "form");
      API.uploadUserImg(form).then(res => {
        if (!!res && res.code === 20000) {
          this.imgPath = !!res.data ? res.data[0] : "";
          this.$emit("imgPath",this.imgPath);
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
  i.el-icon-plus.avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    text-align: center;
    margin-bottom: 10px;
  }
  .avatar {
    width: 140px;
    height: 140px;
    margin-bottom: 10px;
    position: absolute;
  }
  .avatar-uploader {
    text-align: left;
    margin-left: 125px;
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

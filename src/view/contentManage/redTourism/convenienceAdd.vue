<template>
  <div class="margintop20 convenienceAdd">
    <el-form
      style="width:80%;margin:0 auto;"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="demo-ruleForm"
    >
      <!-- 上传封面图片 -->
      <el-row :gutter="24">
        <el-col :span="6">
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
                style="font-size:14px;position: absolute;left: 43px;color:#000;"
                class="alignright"
              >上传图片：</span></i>

            <img
              v-if="ruleForm.imgPath!==''"
              :src="ruleForm.imgPath"
              class="avatar"
            >
          </el-upload>
        </el-col>
        <el-col :span="18">
          <div
            class="alignleft"
            style="margin-top: 22px;"
          >
            <span>点击左图上传封面图片</span><br />
            <span class="spec">要求：</span><br />
            <span>1.建议图片比例 3:1</span><br />
            <span>2.图片大小 10MB以下</span><br />
            <span>3.图片格式 .jpg、.png、.gif等 </span><br />
          </div>
        </el-col>
      </el-row>
      <el-form-item
        label="景区名称"
        prop="scenicSpotName"
      >
        <el-input v-model="ruleForm.scenicSpotName"></el-input>
      </el-form-item>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item
            label="景区开放时间"
            prop="openTime"
            required
          >
            <el-input v-model="ruleForm.openTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="门票价格"
            prop="ticketPrice"
          >
            <el-input v-model="ruleForm.ticketPrice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item
            label="公交路线"
            prop="busRoute"
          >
            <el-input v-model="ruleForm.busRoute"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="预约电话"
            prop="phone"
          >
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="简介"
        prop="description"
      >
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
         <el-form-item
        label="地址"
        prop="adress"
      >
        <el-input v-model="ruleForm.adress"></el-input>
      </el-form-item>
      <el-form-item
        label="内容："
        prop="content"
      >
          <UE
          @ready="editorReady"
          ref="ue"
          :value="defaultMSG"
          :ueditorConfig="config"
          style="width:100%;"
        ></UE>
      </el-form-item>
      <el-form-item class="margintop10">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >提交</el-button>
        <el-button
          type="primary"
          @click="resetForm('ruleForm')"
        >重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import API from "@/api/api_hongselvyou.js";
import UE from "@/components/myEdit";
export default {
  data() {
    return {
      imgData: {},
       defaultMSG: null,
      config: {
        BaseUrl: "",
        UEDITOR_HOME_URL: "static/ueditor/",
        initialFrameWidth: null,
        initialFrameHeight: 600
      },
      ruleForm: {
        scenicSpotName: "sss",
        openTime: "",
        ticketPrice: "22",
        description: "",
        busRoute: "",
        menuId: "",
        content: "",
        imgPath: "",
        adress:"",
        id: ""
      },
      type: "add",
      rules: {
        scenicSpotName: [
          { required: true, message: "请输入景区名称", trigger: "blur" },
          { min: 1, max: 55, message: "长度在 1 到 55 个字符", trigger: "blur" }
        ],
        ticketPrice: [
          { required: true, message: "请输入门票价格", trigger: "blur" }
        ]
      }
    };
  },
  components: { UE },
  created() {
    this.getUpdate();
  },
  methods: {
     editorReady(instance) {
      var that = this;
      setTimeout(function() {
        !!that.ruleForm.content
          ? instance.setContent(that.ruleForm.content)
          : instance.placeholder("请输入。。。");
        instance.addListener("contentChange", () => {
          that.ruleForm.content = instance.getContent();
        });
      }, 300);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          API.addhongselvyou(this.ruleForm).then(res => {
            this.$message({
              message: res.message,
              type: !!res && res.code === 20000 ? "success" : "warning"
            });
            if (!!res && res.code === 20000) {
              var that = this;
              setTimeout(function() {
                that.$router.go(-1);
              }, 1000);
            }
          });
        } else {
          this.$message({
            message: "请输入带*的必填项",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getUpdate() {
      this.ruleForm = !!this.$route.query ? this.$route.query : this.ruleForm;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "png" || "gif";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error("上传图片只能是 jpg 、png格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      if (!isJPG || !isLt10M) {
        return isJPG && isLt10M;
      }
      this.imgData.file = file;
    },
    uploadUserImg() {
      var form = new FormData();
      form.append("menu", this.imgData.menu);
      form.append("file", this.imgData.file);
      window.sessionStorage.setItem("responseType", "form");
      API.uploadImg(form).then(res => {
        if (!!res && res.code === 20000) {
          this.ruleForm.imgPath = !!res.data ? res.data[0] : "";
        }
        this.$message({
          message: res.message,
          type: res.code === 20000 ? "success" : "error"
        });
        window.sessionStorage.setItem("responseType", "json");
      });
    }, // 上传头像
    handleAvatarSuccess(res, file) {
      // this.imgPath = URL.createObjectURL(file.raw);
      // this.ruleForm.imgPath = this.imgPath;
    }
  }
};
</script>
<style <style lang="scss" scoped>
.convenienceAdd {
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
    left: 140px;
    top: 0px;
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

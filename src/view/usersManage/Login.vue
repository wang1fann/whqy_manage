<template>
  <div class="login">
    <img
      class="login_bg"
      src="@/assets/img/login/login_bg.png"
      alt
    >
    <img
      class="login_font"
      src="@/assets/img/login/login_font.png"
      alt
    >
    <el-form
      ref="AccountFrom"
      :model="account"
      :rules="rules"
      label-position="right"
      label-width="70px"
      status-icon
      class="demo-ruleForm login-container"
    >
      <h3 class="title">登录</h3>
      <el-form-item
        prop="userName"
        label=""
        label-width="0"
      >
        <el-input
          type="text"
          v-model="account.userName"
          auto-complete="off"
          placeholder="手机"
        >
          <template slot="prepend"><img
              src="@/assets/img/login/account.png"
              alt=""
            ></template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="passWord"
        label=""
        label-width="0"
      >
        <el-input
          type="password"
          v-model="account.passWord"
          auto-complete="off"
          placeholder="密码"
        >
          <template slot="prepend"><img
              src="@/assets/img/login/password_icon.png"
              alt=""
            ></template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="vrifyCode"
        label=""
        label-width="0"
        id="captcha_item"
      >
        <el-input
          type="text"
          id="captcha_input"
          v-model="account.vrifyCode"
          auto-complete="off"
          placeholder="验证码"
          @keyup.enter.native="handleLogin"
        ></el-input>
        <el-button
          class="captcha-button"
          @click="editCaptcha"
        >{{captcha}}</el-button>
      </el-form-item>
      <el-form-item
        style="width:100%;"
        label-width="0"
      >
        <el-button
          class="login_btn"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
          :loading="loading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import API from "@/api/api_user.js";

import { getCookie, setCookie } from "@/plugins/util"; //引用刚才我们创建的util.js文件，并使用getCookie方法

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      account: {
        userName: "admin",
        passWord: "admin",
        vrifyCode: ""
      },
      captcha: "",
      rules: {
        userName: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        vrifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.editCaptcha();
  },
  methods: {
    editCaptcha() {
      API.getRandomCode()
        .then(res => {
          console.log(res);
          this.captcha = !!res ? res : "加载失败";
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleLogin() {
      window.sessionStorage.responseType = "json";
      let that = this;
      this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          this.loading = true;
          let loginParams = {
            userName: this.account.userName,
            passWord: this.account.passWord,
            vrifyCode: this.account.vrifyCode
          };
          API.login(loginParams)
            .then(
              function(result) {
                that.loading = false;
                if (result && result.ret === true) {
                  localStorage.setItem("access-user", JSON.stringify(result));
                  that.$router.push({ path: "/" });
                  let expireDays = 1000 * 60 * 60;
                  setCookie("loginFlag", result.ret, expireDays); //设置Session
                } else {
                  that.$message.error({
                    showClose: true,
                    message: result.msg || "登录失败",
                    duration: 2000
                  });
                }
              },
              function(err) {
                that.loading = false;
                that.$message.error({
                  showClose: true,
                  message: err.toString(),
                  duration: 2000
                });
              }
            )
            .catch(function(error) {
              that.loading = false;
              console.log(error);
              that.$message,
                error({
                  showClose: true,
                  message: "请求出现异常",
                  duration: 2000
                });
            });
        }
      });
    }
  }
};
</script>
<style>
body {
  background: #fff;
}
.el-input-group__append,
.el-input-group__prepend {
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
.login {
  .login_bg {
    width: 100%;
    min-height: 200px;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 0;
  }
  .login_font {
    width: 50%;
    height: auto;
    z-index: 2;
    position: absolute;
    left: 0px;
    top: 10%;
    right: 0px;
    margin: auto;
  }
  #captcha_item .el-input {
    width: 55%;
    float: left;
  }
  .captcha-button {
    background: #f7f8ee;
    border: 1px solid #f7f8ee;
    color: #e8343a;
    font-size: 21px;
    padding: 7px 20px;
  }
  #captcha_img {
    width: 35%;
    height: 39px;
    float: right;
  }

  #captcha_input {
    width: 106%;
    float: left;
    margin-left: -13px;
  }
  .login-container {
    position: absolute;
    top: 20%;
    left: 0px;
    right: 0px;
    z-index: 2;
    margin: auto;
    vertical-align: middle;
    text-align: center;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 10px auto;
    width: 25%;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #fafdfd;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .login_btn {
      background: #e8343a;
      border: none;
    }
  }
}
</style>
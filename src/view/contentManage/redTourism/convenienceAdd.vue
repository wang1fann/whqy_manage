<template>
  <div class="margintop20">
    <el-form
      style="width:80%;margin:0 auto;"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
    >
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
            label="订餐电话"
            prop="phone"
          >
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-form-item
        label="列车时刻表"
        prop="trainTime"
      >
        <el-input v-model="ruleForm.trainTime"></el-input>
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
import { dateFtt } from "@/plugins/util.js";
export default {
  data() {
    return {
      ruleForm: {
        scenicSpotName: "sss",
        openTime: "",
        ticketPrice: "22",
        trainTime: "",
        busRoute: "",
        menuId:'',
        id:''
      },
      type:"add",
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
  created() {
    this.getUpdate();
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          API.addhongselvyou(this.ruleForm).then(res => {
            this.$message({
              message: res.message,
              type: !!res && res.code === 20000 ? "success" : "warning"
            });
            if (!!res && res.code === 20000) {
              this.$router.go(-1);
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
      console.log(this.$route.query);
      this.ruleForm = !!this.$route.query
        ? this.$route.query
        : this.ruleForm;
    }
  }
};
</script>
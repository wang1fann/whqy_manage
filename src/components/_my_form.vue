<template>
  <div
    class="form"
    :style="'width: ' + (form.width ? form.width : '100%')"
  >
    <!-- 标题 -->
    <div
      class="form-title"
      v-if="form.showTitle"
    >{{form.title}}</div>
    <!-- 通用表单 -->
    <el-form
      v-if="!form.isTable"
      :ref="form.ref"
      :disabled="form.disabled"
      :label-position="form.labelPosition"
      :inline="false"
      size="mini"
      :model="formData"
      enctype="multipart/form-data"
      @submit.native.prevent
      :label-width="form.labelWidth"
    >
      <el-row>
        <!-- 上传图片 -->
        <el-upload
          v-if="form.showUploadImg"
          class="avatar-uploader"
          action="/syx/file/multipleUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="true"
          :http-request="uploadUserImg"
        >
          <!-- 点击上传头像 -->
          <!-- <span>{{formData}}</span> -->
          <img
            class="avatar"
            v-if="formData.imgPath!==''"
            :src="formData.imgPath"
            alt=""
          >
          <img
            v-if="imgPath"
            :src="imgPath"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ><span style="font-size:14px;position: absolute;left: 0px;">上传图片:</span></i>
        </el-upload>
        <template v-for="(item, index) in formItem">
          <el-col
            :span="24/form.column"
            :key="index"
            v-if="item.show"
          >
            <el-form-item
              :label="!!item.width && item.width==='100%'? '':item.label"
              :prop="item.name"
              :rules="item.rules"
              :label-width="!!item.width && item.width==='100%'? '0':item.width"
            >
              <!-- 上传文件 -->
              <el-input
                v-if="item.type === 'file'"
                :type="item.type"
                v-model="formData[item.name]"
              ></el-input>
              <!-- 输入框 -->
              <el-input
                v-else-if="item.type === 'text'"
                v-model="formData[item.name]"
                :type="item.type"
                :style="'width: ' + (item.width ? item.width : '100%')"
                :placeholder="item.placeholder"
                :suffix-icon="item.suffixIcon"
                :prefix-icon="item.prefixIcon"
                :disabled="item.disabled"
              >
                <template
                  v-if="form.style==='prepend'"
                  slot="prepend"
                >{{item.label}}
                </template>
              </el-input>
              <!-- 日期选择框 -->
              <el-date-picker
                v-else-if="item.type === 'date'"
                v-model="formData[item.name]"
                :type="item.type"
                :placeholder="item.placeholder"
                :default-time="item.defaultTime"
                :disabled="item.disabled"
                :format="(item.format ? item.format : 'yyyy-MM-dd')"
                :style="'width: ' + (item.width ? item.width : '100%')"
              ></el-date-picker>
              <!-- 时间选择框 -->
              <el-time-picker
                v-else-if="item.type === 'fixed-time'"
                v-model="formData[item.name]"
                :type="item.type"
                :placeholder="item.placeholder"
                :default-time="item.defaultTime"
                :disabled="item.disabled"
                :format="(item.format ? item.format : 'hh:mm:ss')"
                :style="'width: ' + (item.width ? item.width : '100%')"
              ></el-time-picker>
              <!-- 日期时间选择器 -->
              <el-date-picker
                v-else-if="item.type == 'datetime'"
                v-model="formData[item.name]"
                :type="item.type"
                :placeholder="item.placeholder"
                :default-time="item.defaultTime"
                :align="item.align"
                :picker-options="pickerOptions"
                :disabled="item.disabled"
                :value-format="(item.format ? item.format : 'yyyy-MM-dd hh:mm:ss')"
                :format="(item.format ? item.format : 'yyyy-MM-dd hh:mm:ss')"
                :style="'width: ' + (item.width ? item.width : '100%')"
              ></el-date-picker>
              <!-- 开关 -->
              <el-switch
                v-else-if="item.type=='switch'"
                v-model="formData[item.name]"
              ></el-switch>
              <!-- select选择框 -->
              <el-select
                v-else-if="item.type=='select'"
                v-model="formData[item.name]"
                :placeholder="item.placeholder"
                :multiple="item.multiple"
                :collapse-tags="item.collapseTags"
                :filterable="item.filterable"
                :allow-create="item.allowCreate"
                :style="'width: ' + (item.width ? item.width : '100%')"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.id"
                  :label="option[item.cname]"
                  :value="(item.needChange ? option[item.nName] : option.id)"
                ></el-option>
              </el-select>
              <!-- 复选框 -->
                <!-- @change="handleCheckedCitiesChange" -->
              <el-checkbox-group
                v-else-if="item.type=='checkbox'"
                v-model="formData[item.name]"
                :style="'width: ' + (item.width ? item.width : '100%')"
              >
                <el-checkbox
                  v-for="(option, idx) in item.options"
                  :key="idx"
                  :label="option.id"
                >{{option.name}}</el-checkbox>
              </el-checkbox-group>
              <!-- 单选 -->
              <el-radio-group
                v-else-if="item.type=='radio'"
                v-model="formData[item.name]"
              >
                <el-radio
                  v-for="(option, idx) in item.options"
                  :key="idx"
                  :label="option.value"
                  :disabled="!!option.disabled?option.disabled:false"
                >{{option.label}}</el-radio>
              </el-radio-group>
              <!--单选按钮组 -->
              <el-radio-group
                v-else-if="item.type=='radioGroup'"
                v-model="formData[item.name]"
              >
                <el-radio-button
                  v-for="(option, idx) in item.options"
                  :key="idx"
                  :label="option.label"
                ></el-radio-button>
              </el-radio-group>
              <!-- 文本域 -->
              <el-input
                v-else-if="item.type=='textarea'"
                :type="item.type"
                v-model="formData[item.name]"
                :placeholder="item.placeholder"
              ></el-input>
              <!-- 其他 -->
              <el-input
                v-else-if="item.type=='password'"
                :type="item.type"
                :placeholder="item.placeholder"
                v-model="formData[item.name]"
                @keyup.enter.native="submitForm(form.ref)"
              >
                <template
                  v-if="form.style==='prepend'"
                  slot="prepend"
                >{{item.label}}
                </template>
              </el-input>
              <el-input
                v-else
                :type="item.type"
                :placeholder="item.placeholder"
                v-model="formData[item.name]"
              ></el-input>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 表格式表单 -->
    <el-table
      v-else
      :data="form.data"
      :show-header="true"
      :border="true"
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in form.column"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        width="auto"
      >
        <template slot-scope="scope">
          <el-input
            size="mini"
            v-model="scope.row[item.prop]"
            :disabled="item.disabled"
          >
          </el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-row
      v-if="form.hasSubmit"
      class="btn-group"
    >
      <el-button
        v-if="form.cancleShow"
        size="mini"
        @click="resetForm()"
      >{{form.cancleText}}</el-button>

      <el-button
        type="primary"
        size="mini"
        @click="submitForm(form.ref)"
      >{{form.submitText}}</el-button>
    </el-row>
  </div>
</template>


<script>
/* eslint-disable */
import API from "@/api/api_user.js";
import $qs from "qs";
export default {
  name: "MyForm",

  props: {
    form: {
      type: Object,
      default: () => {
        return {
          title: {
            type: String,
            default: "标题"
          },
          showTitle: {
            type: Boolean,
            default: true
          },
          ref: {
            type: String,

            default: "form"
          },

          width: {
            type: Number,

            default: 100
          },

          isTable: {
            type: Boolean,

            default: false
          },

          labelWidth: {
            type: String,

            default: "120px"
          },

          labelPositon: {
            type: String,

            default: "right"
          },

          column: {
            type: Number,

            default: 1
          },

          hasSubmit: {
            type: Boolean,

            default: false
          },

          disabled: {
            type: Boolean,

            default: false
          }
        };
      }
    },
    formItem: {
      type: Array,
      default: () => [Object]
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      checkAll: false,
      // checkedCities: ["上海", "北京"],
      // cities: cityOptions,
      isIndeterminate: true,
      imgPath: "",
      imgData: {
        file: {
          type: File,
          default: () => {
            return new FormData();
          }
        },
        menu: "用户头像"
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    };
  },

  created() {},
  methods: {
    getSubmitData(clear) {
      for (let i = 0; i < this.forms.length; i++) {
        const item = this.forms[i];
        this.formData[item.ref] = {};
        for (let j = 0; j < item.formItem.length; j++) {
          item.formItem[j].value = clear ? "" : item.formItem[j].value;
          this.formData[item.ref][item.formItem[j].name] =
            item.formItem[j].value;
        }
      }
    },

    onSubmit() {
      this.getSubmitData();
      this.$emit("submit", this.formData);
    },

    onCancel() {
      this.getSubmitData(true);
      this.$emit("cancle");
    },

    submitForm() {
      this.$refs[this.form.ref].validate(valid => {
        if (valid) {
          this.$emit("submit");
        } else {
          return false;
        }
      });
    },

    resetForm() {
      this.$refs[this.form.ref].resetFields();
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imgPath = URL.createObjectURL(file.raw);
      this.formData.imgPath = this.imgPath;
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
    handleCheckedCitiesChange(value) {
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.cities.length;
    },
    uploadUserImg() {
      var form = new FormData();
      form.append("menu", this.imgData.menu);
      form.append("file", this.imgData.file);
      window.sessionStorage.setItem("responseType", "form");
      API.uploadUserImg(form).then(res => {
        window.sessionStorage.setItem("responseType", "json");
        if (!!res && res.code === 20000) {
          this.formData.imgPath = !!res.data ? res.data[0] : "";
          this.$message({
            message: res.message,
            type: "success"
          });
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/variables.scss";

@import "@/assets/base/mixins.scss";
.form {
  margin: 0 auto;
  &-title {
    line-height: 40px;
    background: $tc;
    margin-bottom: 20px;
    color: #fff; // text-align: left
  }

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
  .el-upload.el-upload--text {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-table {
    margin-bottom: 20px;
  }

  .btn-group {
    text-align: center;
    padding: 15px 0px 0px;
  }
  .el-checkbox {
    margin-left: 0;
    width: px2rem(90);
    &:not(:last-of-type) {
      @include px2rem(margin-right, 30);
    }
  }
}
</style>
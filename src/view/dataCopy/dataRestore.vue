<template>
  <div
    class="list content-top-line"
    v-loading="fullscreenLoading"
  >
    <!-- 按钮操作 -->
    <el-row
      class="btn-group alignleft"
      :gutter="24"
      style="margin:6px 0px 6px 13px"
    >
      <el-radio
        v-model="radio"
        label="从服务器还原"
      >从服务器还原</el-radio>
    </el-row>
    <!-- 表格数据 -->
    <MyTable
      v-loading="fullscreenLoading"
      element-loading-text="拼命加载中"
      v-show="radio==='从服务器还原'"
      size="mini"
      :stripe="false"
      :border="false"
      :multiple="false"
      :operation="operation"
      :column="column"
      :data="data.length>0?data.slice((currentPage-1)*pageSize,currentPage*pageSize):[]"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @delete="deleteConfirm"
      @update="update"
      @select="handleSelectionChange"
      @rowClick="rowClick"
    ></MyTable>
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    ></MyConfirm>
    <div
      class="radio-box alignleft"
      style="margin:26px 0px 6px 13px"
    >
      <el-radio
        v-model="radio"
        label="从本地还原"
      >从本地还原</el-radio>
    </div>
    <el-row
      class="my-startcopy-box"
      :gutter="20"
      v-show="radio==='从本地还原'"
    >
      <input
        type="file"
        @change="changeImage($event)"
        id="upload-data-input"
      >
    </el-row>
    <el-row>
      <el-button
        type="danger"
        style="margin:20px 0px;"
        @click="startRestore()"
      >开始还原</el-button>
    </el-row>
  </div>
</template>

<script>
import API from "@/api/api_data.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";
export default {
  name: "dataList",
  data() {
    // 表单配置
    var form = {
      title: "",
      ref: "form1",
      showTitle: false,
      labelWidth: px2rem(140),
      labelPositon: "right",
      width: "80%",
      column: 1,
      hasSubmit: true,
      submitText: "提交",
      cancleText: "取消"
    };
    // 表格操作配置
    var operation = {
      nowPage: "dataList",
      show: true,
      fixed: false,
      size: "mini",
      width: 80 + rem2px(px2rem(160)),
      minWidth: 130,
      label: "操作",
      btns: [
        {
          type: "text",
          size: "mini",
          content: "下载",
          icon: "el-icon-download",
          handle: "update",
          class: "button-operator"
        },
        {
          type: "text",
          size: "mini",
          content: "删除",
          icon: "el-icon-delete",
          handle: "delete",
          class: "button-operator"
        }
      ]
    };
    return {
      fullscreenLoading: false,
      filePath: "",
      radioRow: "",
      localFilePath: "",
      radio: "从服务器还原",
      confirmType: "warning",
      confirmTitle: "提示信息",
      formFile: "",
      confirmContent: "此操作将永久删除该数据, 是否继续?",
      multipleSelection: [],
      createTime: null,
      form: form,
      operation: operation, // 操作按钮
      column: [],
      data: [],
      formItem: [],
      formData: {},
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0,
      type: "adddata"
    };
  },
  created() {
    this.fieldInit();
  },
  mounted() {
    this.resetForm();
  },
  activated() {
    this.getData();
  },
  methods: {
    rowClick(row) {
      this.radioRow = row;
    },
    // table字段初始化
    fieldInit() {
      // 获取字段
      var column = getField("data");
      column.forEach(item => {
        if (!!item.width && item.width != "auto") {
          item.width = rem2px(px2rem(item.width));
        }
      });
      this.column = column;
    },
    // 获取数据
    getData() {
      var _this = this;
      var config = {
        page: _this.currentPage,
        size: _this.pageSize
      };
      // 添加查询字段
      config = $.extend(config, this.searchFormData);
      // 接口调用
      window.sessionStorage.setItem("responseType", "json");
      API.findDataRestoreList(config)
        .then(res => {
          if (!!res && res.code === 20011) {
            //登录已过期
            sessionStorage.removeItem("access-user");
            sessionStorage.removeItem("token");
            this.$router.push({ path: "/login" });
            return;
          }
          this.data = !!res ? res : [];
          this.total = res.length;
        })
        .catch(err => {
          this.$message({
            message: res.err,
            type: "error"
          });
        });
    },
    // 删除
    delete() {
      var _this = this;
      // window.sessionStorage.setItem("responseType", "file");
          window.sessionStorage.setItem("responseType", "json");
          //  var form = new FormData();
      // form.append("createTime",  _this.createTime);
      // API.delDataRestoreList(form)
      API.delDataRestoreList({"createTime":_this.createTime})
        .then(res => {
          this.createTime = null;
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
          window.sessionStorage.setItem("responseType", "json");
          if (!!res && res.code === 20000) {
            this.getData();
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    // 批量.删除
    deleteBatch() {
      var id = [];
      this.multipleSelection.forEach(item => {
        id.push(item.id);
      });
      this.createTime = id.join();
      if (id.length > 0) {
        this.deleteConfirm({ id: this.createTime });
      } else {
        this.$message({
          message: "请至少选择一个选项",
          type: "warning"
        });
      }
    },
    // 删除确认
    deleteConfirm(row) {
      var _this = this;
      console.log(row);
      _this.createTime = row.dbSqlFileCreateTime;
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.delete, _this.cancle);
      }, 100);
    },
    // 取消删除
    cancle() {
      this.createTime = null;
    },
    // 表单重置
    resetForm() {
      if (this.$refs["myform"] != undefined) {
        this.$refs["myform"].resetForm();
      }
    },
    // 获取选中行
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页切换或 单行选中事件
    handleCurrentChange(index) {
      this.currentPage = index;
      this.getData();
    },
    // 数据还原
    dbRestore(row) {
      var filePath = {
        filepath: !!row ? row.dbSqlFilePath : "",
        type: row.type
      };
      this.fullscreenLoading = true;
      API.dbRestore(filePath).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        this.fullscreenLoading = false;
        this.filePath = "";
      });
    },
    changeImage(ev) {
      let files = ev.target.files; //拿到选择的文件
      this.formFile = files;
    },
    uploadFile() {
      window.sessionStorage.setItem("responseType", "form");
      if (!this.formFile) {
        this.$message({
          message: "请选择要还原的本地文件",
          type: "warning"
        });
        return;
      }
      let uploadImginput = document.getElementById("upload-data-input");
      let formfile = new FormData(uploadImginput); //拿到表单创建FormData对象；
      formfile.append("menu", "数据还原");
      formfile.append("file", this.formFile[0]);
      API.uploadFile(formfile).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "error"
        });
        if (!!res && res.code === 20000) {
          this.filePath = res.data[0].replace(/\\/g, "/");
          this.dbRestore({ dbSqlFilePath: this.filePath, type: "2" });
          document.getElementById("upload-data-input").value = "";
          this.formFile = "";
        }
        window.sessionStorage.setItem("responseType", "json");
      });
    },
    startRestore() {
      // 本地还原2  在线传1
      if (this.radio === "从服务器还原") {
        var row = this.radioRow;
        if (!row) {
          this.$message({
            message: "请先选中要还原的已备份数据",
            type: "warning"
          });
          return;
        }
        this.dbRestore({ dbSqlFilePath: row.dbSqlFilePath, type: "1" });
      } else {
        this.uploadFile();
        document.getElementById("upload-data-input").value = "";
      }
    },
    update(row) {
      window.open("http://" + row.dbSqlFilePath);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/variables.scss";
</style>

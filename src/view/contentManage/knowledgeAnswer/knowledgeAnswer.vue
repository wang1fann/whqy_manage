<template>
  <div class="list content-top-line">
    <!-- 按钮操作 -->
    <el-row
      class="btn-group"
      :gutter="24"
    >
      <el-col
        :span="8"
        class="pull-left alignleft"
      >
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-circle-plus"
          @click="gotoUrl('/contentManage/knowledgeAnswerAppend',{menuId: $route.query.menuId})"
        >添加试题</el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-delete"
          @click="deleteBatch"
        >删除题库</el-button>
      </el-col>
      <el-col
        :span="16"
        class="pull-right alignright"
      >
        <MySearch
          class="search"
          :formData="searchFormData"
          :formItem="searchFormItem"
          @submit="searchSubmit"
        ></MySearch>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <MyTable
      size="mini"
      :stripe="false"
      :border="false"
      :multiple="true"
      :showImgColumn="true"
      :operation="operation"
      :column="column"
      :data="data"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @delete="deleteConfirm"
      @update="update"
      @select="handleSelectionChange"
    ></MyTable>
    <!-- myconfirm -->
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    ></MyConfirm>
    <!-- 添加题库弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      top="30vh"
      width="35%"
      :before-close="handleClose"
    >
      <MyForm
        :form="form"
        ref="myform"
        :formData="formData"
        :formItem="formItem"
        @submit="submit"
      ></MyForm>
    </el-dialog>
  </div>
</template>

<script>
import API from "@/api/api_knowledge.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";
export default {
  name: "convenienceSearchList",
  data() {
    // 表单配置
    var form = {
      title: "",
      ref: "form1",
      showTitle: false,
      showUploadImg: true,
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
      nowPage: "convenienceSearchList",
      show: true,
      fixed: false,
      size: "mini",
      width: 80 + rem2px(px2rem(160)),
      minWidth: 100,
      label: "操作",
      btns: [
        {
          type: "text",
          size: "mini",
          content: "编辑",
          icon: "el-icon-edit-outline",
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
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除, 是否继续?",
      dialogTitle: "修改题库",
      dialogVisible: false,
      multipleSelection: [],
      ids: null,
      operation: operation, // 操作按钮
      column: [],
      data: [],
      form: form,
      formItem: [],
      formData: {},
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0,
      type: "addhongselvyou",
      searchFormData: {},
      searchFormItem: [],
      menuId: this.$route.query.menuId
    };
  },
  created() {
    this.fieldInit();
    this.formInit();
    this.searchFormInit();
  },
  mounted() {
    this.getData();
  },
  methods: {
    gotoUrl(path, query) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
    },
    // 弹框关闭时的回调函数
    handleClose(done) {
      done();
    },
    // 表单重置
    resetForm() {
      if (this.$refs["myform"] != undefined) {
        this.$refs["myform"].resetForm();
      }
    },
    formInit(row) {
      this.formItem = getFormField("testLibary", "item");
      this.formData = !!row ? row : getFormField("testLibary", "data");
    },
    fieldInit() {
      // 获取字段
      var column = getField("knowledge");
      column.forEach(item => {
        if (!!item.width && item.width != "auto") {
          item.width = rem2px(px2rem(item.width));
        }
      });
      this.column = column;
    },
    // 搜索表单数据初始化
    searchFormInit() {
      this.searchFormItem = getSearchField("knowledge", "item");
      this.searchFormData = getSearchField("knowledge", "data");
    },
    update(row) {
      this.formInit(row);
      this.dialogTitle = "编辑题库";
      this.dialogVisible = true;
    },
    // 更新数据
    submit(row) {
      API.addTestLibrary(this.formData).then(res => {
        this.dialogVisible = false;
        this.$message({
          message: res.total === 0 ? "暂无数据" : res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        if (!!res && res.code === 20011) {
          //登录已过期
          sessionStorage.removeItem("access-user");
          sessionStorage.removeItem("token");
          var that = this;
          setTimeout(function() {
            that.$router.push({ path: "/login" });
          }, 2000);
          return;
        }
        if (!!res && res.code === 20000) {
          var that = this;
          setTimeout(function() {
            that.getData();
          }, 1500);
        }
      });
    },
    // 获取数据
    getData() {
      var _this = this;
      var config = {
        page: _this.currentPage,
        size: _this.pageSize,
        menuId: this.$route.query.menuId
      };
      // 添加查询字段
      config = $.extend(config, this.searchFormData);
      window.sessionStorage.setItem("responseType", "json");
      // 接口调用
      API.findTestLibraryByPage(config)
        .then(res => {
          if (!!res && res.code === 20000) {
            this.data = res.data.rows;
            this.total = res.data.total;
          }
          this.$message({
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "warning"
          });
        })
        .catch(err => {});
    },
    // 删除
    delete() {
      var _this = this;
      API.delTestLibrary({ id: _this.ids })
        .then(res => {
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
          if (!!res && res.code === 20000) {
            this.ids = null;
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
    // 批量删除
    deleteBatch() {
      var id = [];
      this.multipleSelection.forEach(item => {
        id.push(item.id);
      });
      this.ids = id.join();
      if (id.length > 0) {
        this.deleteConfirm({ id: this.ids });
      } else {
        this.$message({
          message: "请至少选择一个选项",
          type: "warning"
        });
      }
    },
    // 删除确认
    // 删除确认
    deleteConfirm(row) {
      var _this = this;
      _this.ids = row.id;
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.delete, _this.cancle);
      }, 100);
    },
    // 取消删除
    cancle() {
      this.ids = null;
    },
    // 获取选中行
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页切换
    handleCurrentChange(index) {
      this.currentPage = index;
      this.getData();
    },
    // 搜索
    searchSubmit() {
      this.currentPage = 1;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/variables.scss";
</style>

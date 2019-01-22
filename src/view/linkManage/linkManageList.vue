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
          @click="showDialog"
        >添加链接</el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-delete"
          @click="deleteBatch"
        >删除链接</el-button>
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
    <!-- 表单提交 -->
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
    <!-- myconfirm -->
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    ></MyConfirm>
  </div>
</template>

<script>
import API from "@/api/api_link.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";
export default {
  name: "linkList",
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
      nowPage: "linkList",
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
      confirmContent: "此操作将永久删除该文件, 是否继续?",
      dialogTitle: "添加链接",
      dialogVisible: false,
      multipleSelection: [],
      ids: null,
      form: form,
      operation: operation, // 操作按钮
      column: [],
      data: [],
      formItem: [],
      formData: {},
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0,
      type: "addLink",
      searchFormData: {},
      searchFormItem: []
    };
  },
  created() {
    this.fieldInit();
    this.formInit();
    this.searchFormInit();
  },
  mounted() {
    this.resetForm();
  },
  activated() {
    this.getData();
  },
  methods: {
    // table字段初始化
    fieldInit() {
      var column = getField("link");
      column.forEach(item => {
        if (!!item.width && item.width != "auto") {
          item.width = rem2px(px2rem(item.width));
        }
      });
      this.column = column;
    },
    formInit(row) {
      this.formItem = getFormField("link", "item");
      this.formData = !!row ? row : getFormField("link", "data");
    },
    searchFormInit() {
      this.searchFormItem = getSearchField("link", "item");
      console.log(this.searchFormItem);
      this.searchFormData = getSearchField("link", "data");
    },
    showDialog() {
      this.formInit();
      this.dialogTitle = "添加链接";
      this.type = "addLink";
      this.dialogVisible = true;
    },
    // 更新数据
    update(row) {
      this.formInit(row);
      this.dialogTitle = "编辑链接";
      this.type = "addLink";
      this.dialogVisible = true;
    },
    // 提交数据
    submit() {
      setTimeout(() => {
        API[this.type](this.formData).then(res => {
          this.dialogVisible = false;
          this.$message({
            message: res.message,
            type: !!res && res.code===20000 ? "success" : "warning"
          });
          if(!!res && res.code === 20000){
            this.getData();
          }
        });
      }, 50);
    },
    // 弹框关闭时的回调函数
    handleClose(done) {
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = "";
        }
      }
      this.resetForm();
      done();
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
      API.findlinkList(config)
        .then(res => {
          // 
          if (!!res && res.code === 20000) {
            this.data = res.data.rows;
            this.total = res.data.total;
          }
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
        })
        .catch(err => {
          this.$message({
            message: "数据加载失败",
            type: "error"
          });
        });
    },
    // 删除
    delete() {
      var _this = this;
      console.log(_this.ids);
      API.delLink({ id: _this.ids })
        .then(res => {
          this.ids = null;
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
          this.getData();
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
    // 分页切换
    handleCurrentChange(index) {
      this.currentPage = index;
      this.getData();
    },
    // 搜索
    searchSubmit() {
      this.currentPage=1;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/variables.scss";
</style>

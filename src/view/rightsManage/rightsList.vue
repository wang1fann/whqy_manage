<template>
  <div class="list content-top-line">
    <!-- 按钮操作 -->
    <el-row class="btn-group" :gutter="24">
      <el-col :span="8" class="pull-left alignleft">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="gotoUrl('/addRights')">添加权限</el-button>
        <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteBatch">删除权限</el-button>
      </el-col>
      <el-col :span="16" class="pull-right alignright">
        <MySearch class="search" :formData="searchFormData" :formItem="searchFormItem" @submit="searchSubmit"></MySearch>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <MyTable size="mini" :stripe="false" :border="false" :multiple="true" :operation="operation" :column="column" :data="data" :currentPage="currentPage" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange" @delete="deleteConfirm" @update="update" @select="handleSelectionChange"></MyTable>
    <!-- 表单提交 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" top="10vh" width="50%" :before-close="handleClose">
      <MyForm :form="form" ref="myform" :formData="formData" :formItem="formItem" @submit="submit"></MyForm>
    </el-dialog>
    <!-- myconfirm -->
    <MyConfirm ref="myconfirm" :type="confirmType" :title="confirmTitle" :content="confirmContent"></MyConfirm>
  </div>
</template>

<script>
import API from "@/api/api_rights.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";
export default {
  name: "rightsList",
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
      nowPage: "rightsList",
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
      confirmContent: "此操作将永久删除该文件, 是否继续?",
      dialogTitle: "添加权限",
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
      type: "saveTask",
      searchFormData: {},
      searchFormItem: [],
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
    gotoUrl(path, query) {
      console.log(path);
      console.log(query);
      // query为object类型。eg：{id:id}
      this.$router.push({
        path: !!path ? path : '',
        query: !!query ? query : ''
      })
    },
    // table字段初始化
    fieldInit() {
      // 获取字段
      var column = getField("rights");
      column.forEach(item => {
        if (!!item.width && item.width != "auto") {
          item.width = rem2px(px2rem(item.width));
        }
      });
      this.column = column;
    },
    // 表单数据初始化
    formInit() {
      // 获取form字段
      this.formItem = getFormField("rights", "item");
      this.formData = getFormField("rights", "data");
    },
    searchFormInit() {
      this.searchFormItem = getSearchField("rights", "item");
      this.searchFormData = getSearchField("rights", "data");
    },
    // 添加数据
    // showDialog() {
    //   this.formInit();
    //   this.dialogTitle = "添加权限";
    //   this.type = "saveTask";
    //   this.dialogVisible = true;
    // },
    // 更新数据
    update(row) {
      this.formInit();
      this.dialogTitle = "添加权限";
      this.type = "updateTaskById";
      this.dialogVisible = true;
    },
    // 提交数据
    submit() {
      console.log(this.formData);
      setTimeout(() => {
        API[this.type](this.formData).then(res => {
          this.dialogVisible = false;
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
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
        pageNo: _this.currentPage,
        size: _this.pageSize
      };
      // 添加查询字段
      config = $.extend(config, this.searchFormData);
      // 接口调用
      API.findRightsList(config).then(res => {
        console.log(res);
        this.data = res.data.list;
        this.total = res.data.total;
      }).catch(err => {
        console.log(err);
        this.total = 10;
        this.data = [
          {
            role: "wangyifan",
            name: "yifanwang",
            password: 5556788992,
            section: "科目一",
            task: "任务"
          }
        ];
      });
    },
    // 删除
    delete() {
      var _this = this;
      API.deleteTaskById({ ids: _this.ids }).then(res => {
        this.ids = null;
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getData();
      });
    },
    // 批量删除
    deleteBatch() {
      var id = [];
      this.multipleSelection.forEach(item => {
        id.push(item.taskId);
      });
      if (id.length > 0) {
        this.deleteConfirm({ taskId: id });
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
      var ids = [];
      if (typeof row.taskId === "number") {
        ids.push(row.taskId);
      } else {
        ids = row.taskId;
      }
      this.ids = ids.join();
      this.confirmContent = "此操作将永久删除该文件, 是否继续?";
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.delete, _this.cancle);
      }, 100);
    },
    // 取消删除
    cancle() {
      this.ids = null;
    },
    // 挂起控制
    hangUpConfirm(row) {
      var _this = this;
      var ids = [];
      if (typeof row.taskId === "number") {
        ids.push(row.taskId);
      } else {
        ids = row.taskId;
      }
      this.ids = ids.join();
      this.confirmContent = "是否执行挂起操作, 是否继续?";
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.hangUp, _this.cancle);
      }, 100);
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
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/variables.scss";
</style>

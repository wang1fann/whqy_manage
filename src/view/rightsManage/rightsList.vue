<template>
  <div
    class="list content-top-line"
    v-loading="fullscreenLoading"
  >
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
          :disabled="resCode === 502 ? true:false"
          @click="gotoUrl('/addRights','')"
        >添加权限</el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-delete"
          :disabled="resCode === 502 ? true:false"
          @click="deleteBatch"
        >删除权限</el-button>
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
      resCode: "",
      fullscreenLoading: false,
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
      searchFormItem: []
    };
  },
  created() {
    this.fieldInit();
    this.searchFormInit();
    this.getData();
  },
  methods: {
    gotoUrl(path, query) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
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
    searchFormInit() {
      this.searchFormItem = getSearchField("rights", "item");
      this.getUserTypeData(this.searchFormItem[1]);
      this.getFormInfoData(this.searchFormItem[2]);
      this.searchFormData = getSearchField("rights", "data");
    },
    // 添加数据
    // 更新数据
    update(row) {
      row.menuId = this.$route.query.menuId;
      this.gotoUrl("/addRights", row);
    },
    // 获取科室列表
    getFormInfoData(obj) {
      // formInfo   初始化加载formInfo 科室选项
      obj.options = [
        {
          value: "0",
          label: "全部",
          id: "0"
        }
      ];
      API.getDepartment().then(res => {
        if (!!res && res.code === 20000) {
          for (var i = 0; i < res.data.length; i++) {
            obj.options.push({
              value: res.data[i].id,
              label: res.data[i].name,
              id: res.data[i].id
            });
          }
        }
      });
    },
    // 获取用户类型列表
    getUserTypeData(obj) {
      // formInfo   初始化加载formInfo 科室选项
      obj.options = [
        {
          value: "0",
          label: "全部",
          id: "0"
        }
      ];
      API.getUserType().then(res => {
        if (!!res && res.code === 20000) {
          for (var i = 0; i < res.data.length; i++) {
            obj.options.push({
              value: res.data[i].roleId,
              label: res.data[i].roleName,
              id: res.data[i].roleId
            });
          }
        }
      });
    },
    // 获取数据
    getData() {
      var _this = this;
      var config = {
        page: _this.currentPage + "",
        size: _this.pageSize + ""
      };
      // 添加查询字段
      config = $.extend(config, this.searchFormData);
      config.deptid = !config.deptid ? "0" : config.deptid;
      config.permissionId = !config.permissionId ? "0" : config.permissionId;
      // 接口调用
      this.fullscreenLoading = true;
      API.findPermissionAll(config)
        .then(res => {
          this.fullscreenLoading = false;
          this.resCode = res.code;
          this.$notify({
            title: "提示",
            message: res.message,
            type: "warning"
          });
          if (!!res && res.code === 20011) {
            //登录已过期
            localStorage.removeItem("access-user");
            localStorage.removeItem("token");
            var that = this;
            setTimeout(function() {
              that.$router.push({ path: "/login" });
            }, 2000);
            return;
          }
          if (!!res && res.code === 20000) {
            this.data = res.data.rows;
            this.total = res.data.total;
          }
        })
        .catch(err => {
          this.fullscreenLoading = false;
        });
    },
    // 删除
    delete() {
      var _this = this;
      
      API.delUser({ id: _this.ids })
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
      this.currentPage = 1;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/variables.scss";
</style>

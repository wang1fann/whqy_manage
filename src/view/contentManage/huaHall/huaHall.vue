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
          @click="gotoUrl('/contentManage/huaHallAppend',{menuId: $route.query.menuId})"
        >添加渭华讲堂</el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-delete"
          @click="deleteBatch"
        >删除渭华讲堂</el-button>
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
  </div>
</template>

<script>
import API from "@/api/api_weihuajiangtang.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";
export default {
  name: "convenienceSearchList",
  data() {
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
      confirmContent: "此操作将永久删除该文件, 是否继续?",
      dialogTitle: "添加渭华讲堂",
      multipleSelection: [],
      ids: null,
      operation: operation, // 操作按钮
      column: [],
      data: [],
      formItem: [],
      formData: {},
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0,
      type: "add",
      searchFormData: {},
      searchFormItem: [],
      menuId: !!this.$route.query.menuId
        ? this.$route.query.menuId + ""
        : this.$route.name
    };
  },
  created() {
    this.fieldInit();
    this.searchFormInit();
  },
  mounted() {
    this.getData();
  },
  activated() {
    this.getData();
  },
  methods: {
    gotoUrl(path, query) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
    },
    fieldInit() {
      // 获取字段
      var column = getField("huaHall");
      column.forEach(item => {
        if (!!item.width && item.width != "auto") {
          item.width = rem2px(px2rem(item.width));
        }
      });
      this.column = column;
    },
    // 搜索表单数据初始化
    searchFormInit() {
      this.searchFormItem = getSearchField("huaHall", "item");
      this.searchFormData = getSearchField("huaHall", "data");
    },
    // 更新数据
    update(row) {
      row.menuId = !!this.$route.query.menuId
        ? this.$route.query.menuId + ""
        : this.$route.name;
      this.gotoUrl("/contentManage/huaHallAppend", row);
    },
    // 获取数据
    getData() {
      var _this = this;
      var config = {
        page: _this.currentPage,
        size: _this.pageSize,
        menuId: !!this.$route.query.menuId
          ? this.$route.query.menuId + ""
          : this.$route.name
      };
      // 添加查询字段
      window.sessionStorage.setItem("responseType", "json");
      config = $.extend(config, this.searchFormData);
      // 接口调用
      API.findData(config)
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
        .catch(err => {
          alert(err);
        });
    },
    // 删除
    delete() {
      var _this = this;
      API.delAPI({ id: _this.ids })
        .then(res => {
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
          if (!!res && res.code === 20000) {
            this.ids = null;
            var that = this;
            setTimeout(function() {
              that.getData();
            }, 1000);
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
        _this.$refs.myconfirm.confirm(_this.delete, _this.cancle);
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
       this.currentPage=1;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/variables.scss";
</style>

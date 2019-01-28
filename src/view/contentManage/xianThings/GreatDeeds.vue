<template>
  <div
    class="list content-top-line"
    v-loading="fullscreenLoading"
    element-loading-text="拼命加载中"
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
          @click="gotoUrl('/contentManage/xianThings/xianTingsAdd',{menuId: $route.query.menuId})"
        >添加<i>{{buttonName}}</i></el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-delete"
          @click="deleteBatch"
        >删除{{buttonName}}</el-button>
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
          @updateTime="getUpdateTime"
        ></MySearch>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <MyTable
      size="mini"
      :stripe="false"
      :border="false"
      :multiple="true"
      :showImgColumn="false"
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
import API from "@/api/api_xianTings.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px, dateFtt } from "@/plugins/util.js";
import { setTimeout } from "timers";

export default {
  name: "xilaojingshengList",
  data() {
    // 表格操作配置
    var operation = {
      nowPage: "xilaojingshengList",
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
      fullscreenLoading: false,
      buttonName: this.$route.query.name,
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除该文件, 是否继续?",
      dialogTitle: "添加文化遗产",
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
      type: "addhongselvyou",
      searchFormData: {},
      searchFormItem: [],
      menu: !!this.$route.query.menuId
        ? this.$route.query.menuId + ""
        : this.$route.name
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
    fieldInit() {
      // 获取字段
      var column = getField("redEducation");
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
      this.searchFormData.updateTime = "";
    },
    // 更新数据
    update(row) {
      row.menuId = this.$route.query.menuId + "";
      this.gotoUrl("/contentManage/xianThings/xianTingsAdd", row);
    },
    // 弹框关闭时的回调函数
    handleClose(done) {
      done();
    },
    getUpdateTime(val) {
      this.searchFormData.updateTime = val;
    },
    // 获取数据
    getData() {
      var that = this;
      var config = {
        page: that.currentPage,
        size: that.pageSize,
        menuId: !!this.$route.query.menuId
          ? this.$route.query.menuId + ""
          : this.$route.name
      };
      config = $.extend(config, this.searchFormData);
      window.sessionStorage.setItem("responseType", "json");
      this.fullscreenLoading = true;
      API.findList(config)
        .then(res => {
          if (!!res && res.code === 20000 && res.data.total !== 0) {
            that.data = res.data.rows;
            that.total = res.data.total;
            that.searchFormData.updateTime = "";
          }
          this.fullscreenLoading = false;
          that.$message({
            message:
              !!res && res.data.total === 0
                ? "查询成功，暂无相关数据"
                : res.message,
            type: !!res && res.code === 20000 ? "success" : "warning"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    delete() {
      var that = this;
      API.delAPI({ id: that.ids })
        .then(res => {
          this.$notify({
            title: "提示",
            duration: "1000",
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "error"
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
      var that = this;
      that.ids = row.id;
      setTimeout(() => {
        this.$refs.myconfirm.confirm(that.delete, that.cancle);
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

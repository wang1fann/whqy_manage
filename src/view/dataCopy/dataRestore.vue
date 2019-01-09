<template>
  <div class="list content-top-line">
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
      v-show="radio==='从服务器还原'"
      size="mini"
      :stripe="false"
      :border="false"
      :multiple="false"
      :operation="operation"
      :column="column"
      :data="data"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @delete="deleteConfirm"
      @update="''"
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
      <input type="file">
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
          handle: "downloadData",
          class: "button-operator"
        }
      ]
    };
    return {
      // currentRow:null,
      radioRow: "",
      localFilePath: "",
      radio: "从服务器还原",
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除该数据, 是否继续?",
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
      console.log(row);
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
          console.log(res);
          this.data = res.data.rows;
          this.total = res.data.total;
        })
        .catch(err => {
          this.$message({
            message: "数据加载失败",
            type: "error"
          });
          this.total = 10;
          this.data = [
            {
              filePath: "wangyifan",
              restoreTime: "2018-10-11"
            },
            {
              filePath: "E:/后台ui",
              restoreTime: "2010-10-11"
            }
          ];
        });
    },
    // 删除
    delete() {
      var _this = this;
      console.log(_this.ids);
      API.deldata({ id: _this.ids })
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
    // 分页切换或 单行选中事件
    handleCurrentChange(index) {
      // console.log(index);
      // this.currentRow=index;
      this.currentPage = index;
      this.getData();
    },
    // 数据库还原
    dbRestore(row) {
      if (!row.filePath) {
         this.$message({
          message: '请先选中要还原的已备份数据',
          type: 'warning'
        });
        return;
      }
      var filePath = { filePath: !!row ? row.filePath : "" };
      API.dbRestore(filePath).then(res => {
        console.log(res);
      });
    },
    startRestore() {
      if (this.radio === "从服务器还原") {
        this.dbRestore(this.radioRow);
      } else {
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/variables.scss";
</style>

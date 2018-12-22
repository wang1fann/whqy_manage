<template>
  <div class="bannerphoto">
    <el-button-group class="pull-left">
      <el-button type="primary" icon="el-icon-edit" @click="showDialog">新增banner</el-button>
      <el-button
        type="primary"
        icon="el-icon-delete"
        :disabled="this.sels.length===0"
        @click="delBanner"
      >删除banner</el-button>
    </el-button-group>
    <my-dialog :show="show" :title="title" @updateshow="showval">
      <el-form
        ref="dialogFormInfo"
        :model="dialogFormInfo"
        id="dialogFormInfo"
        label-width="100px"
        :label-position="labelPosition"
      >
        <el-form-item label="对应模块" prop="moudle">
          <el-radio v-model="dialogFormInfo.moudle" label="company">公司介绍</el-radio>
          <el-radio v-model="dialogFormInfo.moudle" label="product">产品中心</el-radio>
          <el-radio v-model="dialogFormInfo.moudle" label="case">成功案例</el-radio>
          <el-radio v-model="dialogFormInfo.moudle" label="news">新闻中心</el-radio>
          <el-radio v-model="dialogFormInfo.moudle" label="us">关于我们</el-radio>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="text" v-model="dialogFormInfo.remark" palceholder="请输入banner备注"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="text" v-model="dialogFormInfo.content" palceholder="请输入banner相关内容"></el-input>
        </el-form-item>
        <el-form-item label="banner照片" prop="pic">
          <input type="file" @change="picChange($event)">
        </el-form-item>
        <el-form-item class="btn_group">
          <el-button type="primary" @click="submitBanner">确定</el-button>
          <el-button type="primary" @click="show = false">取消</el-button>
        </el-form-item>
      </el-form>
    </my-dialog>
    <egrid
      border
      column-type="selection"
      :data="data"
      :columns="columns"
      :columns-schema="columnsSchema"
      :columns-props="columnsProps"
      :columns-handler="columnsHandler"
      @selection-change="selectionChange"
    ></egrid>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[pageSize,10,100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import Data from "@/assets/js/data";
import Btn from "@/components/CellBtn";
import Editor from "@/components/CellEditor";
import Vue from "vue";

import MyDialog from "@/components/MyDialog";
import * as util from "@/api/util.js";
import API from "@/api/api_banner";

export default {
  components: {
    "my-dialog": MyDialog
  },
  data() {
    return {
      show: false,
      title: "新增banner",
      sels: [],
      labelPosition: "right",
      dialogFormInfo: {
        moudle: "",
        remark: "",
        content: "",
        pic: ""
      },
      total: 0,
      currentPage: 1,
      pageSize: 5,
      parPageSize: 5,
      data: [],
      columns: [
        { label: "对应模块", prop: "moudle" },
        { label: "备注", prop: "remark" },
        { label: "内容", prop: "content" },
        { label: "图片", prop: "url" }
      ],
      columnsProps: {
        width: "100%",
        align: "center",
        sortable: true,
        component: Editor
      },
      // columnsSchema 可以用来单独定义 columns 的某一列，这里的设置会覆盖 columnsProps 的配置属性
      columnsSchema: {
        图片: {
          width: "100px",
          propsHandler({ col, row }) {
            return { url: row[col.prop] };
          },
          component: Vue.extend({
            props: ["url"],
            render(h) {
              return h(
                "img",
                {
                  attrs: { src: this.url },
                  style: { width: "100px", height: "100px" }
                },
                this
              );
            }
          })
        }
      }
    };
  },
  created() {
    this.getBannerList();
  },
  methods: {
    showDialog() {
      this.show = true;
    },
    closeDialog() {
      this.show = false;
    },
    showval(val) {
      this.show = val;
    },
    picChange(fileval) {
      this.dialogFormInfo.pic = fileval.target.files[0];
    },
    columnsHandler(cols) {
      let that = this;
      return cols.concat({
        label: "操作",
        align: "center",
        component: Btn,
        listeners: {
          "row-editor"(row) {
            that.showDialog();
            that.dialogFormInfo = row;
          }
        }
      });
    },
    selectionChange(rows) {
      this.sels = rows;
    },
    handleSizeChange(val) {
      this.parPageSize = val;
      this.currentPage = 1;
      this.getMessageList();
    },
    handleCurrentChange(row) {
      this.currentPage = row;
      this.getBannerList();
    },
    getBannerList() {
      window.sessionStorage.responseType = "form";
      let that = this;
      let formData = new FormData();
      formData.append("page", this.currentPage);
      formData.append("size", this.parPageSize);
      API.findBannerList(formData)
        .then(
          function(result) {
            that.data = result.list;
            that.total = result.total; //总共多少条
          },
          function(err) {
            var data = [
              {
                id: 1,
                role: "SS",
                username: "dd",
                department: "SSSSSSSSSSS",
                task: "CCC"
              },
              {
                id: 2,
                role: "超级管理员",
                username: "dd",
                department: "SSSSSSSSSSS",
                task: "CCC"
              },
              {
                id: 3,
                role: "普通用户",
                username: "dd",
                department: "SSSSSSSSSSS",
                task: "CCC"
              }
            ];
            that.data = data;
            that.total = 30; //总共多少条
            that.$message.error({
              showClose: true,
              message: err.toString(),
              duration: 2000
            });
          }
        )
        .catch(function(error) {
          that.$message.error({
            showClose: true,
            message: error,
            duration: 2000
          });
        });
    },
    submitBanner(val) {
      var that = this;
      window.sessionStorage.responseType = "file";
      let formData = new FormData();
      for (var key in this.dialogFormInfo) {
        formData.append(key, this.dialogFormInfo[key]);
      }
      if (that.picChangeFlag == false) {
        var filepath = "D:phpStudyWWW\fe10my-elementsrcassetsimg\notupload.png";
        var objFile = new File([""], "notupload.png", {
          type: "image/png",
          lastModified: "",
          Path: filepath
        });
        formData.set("pic", objFile);
      } else {
        // formData.set('url','');
        formData.delete("url");
      }
      formData.delete("_edit");
      API.addBanner(formData)
        .then(
          function(result) {
            if (result.ret == true) {
              that.$message.success({
                showClose: true,
                message: result.msg,
                duration: 2000
              });
              that.dialogFormInfo = {
                moudle: "",
                remark: "",
                content: "",
                pic: ""
              };
              that.closeDialog();
              that.getBannerList();
            } else {
              that.$message.warning({
                showClose: true,
                message: result.msg,
                duration: 2000
              });
            }
          },
          function(err) {
            that.$message.warning({
              showClose: true,
              message: result.msg,
              duration: 2000
            });
          }
        )
        .catch(function(error) {
          that.loading = false;
          that.$message.error({
            showClose: true,
            message: "请求出现异常",
            duration: 2000
          });
        });
    },
    delBanner() {
      window.sessionStorage.responseType = "form";
      let ids = this.sels.map(item => item.id).toString(); //1,3
      let that = this;
      let formData = new FormData();
      formData.append("ids", ids);
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let that = this;
          API.delBanner(formData)
            .then(
              function(result) {
                if (result.ret == true) {
                  that.$message.success({
                    showClose: true,
                    message: result.msg,
                    duration: 2000
                  });
                  that.getBannerList();
                  return;
                }
              },
              function(err) {
                that.$message.error({
                  showClose: true,
                  message: result.msg,
                  duration: 2000
                });
              }
            )
            .catch(function(error) {
              that.$message.error({
                showClose: true,
                message: error,
                duration: 2000
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style>
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding: 0px 0px;
}
.btn_group .el-form-item__content {
  margin-left: 0px !important;
}
</style>

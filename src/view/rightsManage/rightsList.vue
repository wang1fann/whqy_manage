<template>
  <div class="companyhonor content-top-line">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-button-group class="pull-left">
          <el-button type="primary" icon="el-icon-circle-plus" @click="showDialog">新增</el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            :disabled="this.sels.length===0"
            @click="delRightsList"
          >删除</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="18">
        <el-form :inline="true" :model="formInline" class="pull-right demo-form-inline">
          <el-form-item label="角色">
            <el-select v-model="formInline.region" placeholder="角色">
              <el-option label="超级管理员" value="shanghai"></el-option>
              <el-option label="权限管理员" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formInline.user" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="科室">
            <el-select v-model="formInline.region" placeholder="科室">
              <el-option label="组织科" value="shanghai"></el-option>
              <el-option label="组织科二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="el-form-item-search">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <my-dialog :show="show" :title="title" @updateshow="showval">
      <el-form
        ref="dialogFormInfo"
        :model="dialogFormInfo"
        id="dialogFormInfo"
        label-width="100px"
        :label-position="labelPosition"
      >
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="dialogFormInfo.title" palceholder="请输入荣誉资质名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="text" v-model="dialogFormInfo.remark" palceholder="请输入荣誉资质备注"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="text" v-model="dialogFormInfo.content" palceholder="请输入荣誉资质相关内容"></el-input>
        </el-form-item>
        <el-form-item label="过期日期" prop="expired">
          <el-date-picker
            type="date"
            width="100%"
            @change="expired"
            format="yyyy-MM-dd"
            v-model="dialogFormInfo.expired"
            placeholder="荣誉过期日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="荣誉照片" prop="pic">
          <input type="file" @change="picChange($event)">
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" @click="submitRights">确定</el-button>
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
import Menu from "view/Menu";
import Data from "@/assets/js/data";
import Btn from "@/components/CellBtn";
import Editor from "@/components/CellEditor";
import Vue from "vue";

import MyDialog from "@/components/MyDialog";
import * as util from "@/api/util.js";
import API from "@/api/api_rights";

export default {
  components: {
    "my-dialog": MyDialog,
    "my-menu": Menu
  },
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      show: false,
      title: "新增荣誉",
      sels: [],
      labelPosition: "right",
      dialogFormInfo: {
        title: "",
        remark: "",
        expired: "",
        content: "",
        pic: ""
      },
      total: 0,
      currentPage: 1,
      pageSize: 5,
      parPageSize: 5,
      data: [],
      // 角色 用户名 密码 科室 任务 操作
      columns: [
        { label: "角色", prop: "role" },
        { label: "用户名", prop: "username" },
        { label: "密码", prop: "password" },
        { label: "科室", prop: "department", width: 200 },
        { label: "任务", prop: "task" }
      ],
      columnsProps: {
        width: "100%",
        align: "center",
        sortable: true,
        component: Editor
      }
    };
  },
  created() {
    this.getRightsList();
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
    expired(date) {
      //改变时间格式，将中国标准时间改为 yy-mm-dd的格式
      this.dialogFormInfo.expired = util.dateFormat(date, true);
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
          listeners: [{
          "row-editor"(row) {
            that.showDialog();
            that.dialogFormInfo = row;
          }
        },{
          "row-delete"(row) {
            // that.showDialog();
            // that.dialogFormInfo = row;
          }
        }]
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
      this.getRightsList();
    },
    getRightsList() {
      let that = this;
      let listParams = {
        size: this.parPageSize,
        page: this.currentPage,
        order: "asc"
      };
      API.findRightsList(listParams)
        .then(
          function(result) {
            that.data = result.list;
            that.total = result.total; //总共多少条
          },
          function(err) {
            var data = [
              {
                role: "SS",
                username: "dd",
                department: "SSSSSSSSSSS",
                task: "CCC"
              },
                {
                role: "超级管理员",
                username: "dd",
                department: "SSSSSSSSSSS",
                task: "CCC"
              },  {
                role: "权限管理员",
                username: "dd",
                department: "SSSSSSSSSSS",
                task: "CCC"
              }
            ];
            that.data = data;
            that.total = 30;//总共多少条
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
    submitRights(val) {
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
      }
      formData.delete("_edit");
      formData.delete("picurl");
      API.addHonor(formData)
        .then(
          function(result) {
            if (result.ret == true) {
              that.$message.success({
                showClose: true,
                message: result.msg,
                duration: 2000
              });
              that.dialogFormInfo = {
                title: "",
                remark: "",
                expired: "",
                content: "",
                pic: ""
              };
              that.closeDialog();
              that.getRightsList();
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
    delRightsList() {
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
          API.delHonor(formData)
            .then(
              function(result) {
                if (result.ret == true) {
                  that.$message.success({
                    showClose: true,
                    message: result.msg,
                    duration: 2000
                  });
                  that.getRightsList();
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
  text-align: center;
}

</style>

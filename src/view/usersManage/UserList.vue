<template>
<div class = "list content-top-line" v-loading = "fullscreenLoading"> 
  <el-row class = "btn-group" :gutter = "24"> 
    <el-col :span = "8"  class="pull-left alignleft">
       <el-button 
          type = "primary"
          size = "mini"
          icon = "el-icon-circle-plus"
          @click = "showDialog"> 
          添加用户 
       </el-button> 
       <el-button 
          type = "primary"
          size = "mini"
          icon = "el-icon-delete"
          @click = "deleteBatch"> 
          删除用户 
        </el-button>
    </el-col>
    <el-col 
       :span = "16" 
        class = "pull-right alignright"> 
        <el-button 
          class = "pull-right" 
          @click = "exportUserList">
          <i class = "el-icon-upload2"></i> 导出 
        </el-button> 
        <MySearch class = "pull-right search"
        :formData = "searchFormData"
        :formItem = "searchFormItem"
        @submit = "searchSubmit">
        </MySearch> 
        </el-col> 
        </el-row> 
        <MyTable 
          size = "mini"
          :stripe = "false"
          :border = "false"
          :multiple = "true" 
          :operation = "operation"
          :column = "column"
          :data = "data"
          :currentPage = "currentPage"
          :pageSize = "pageSize"
          :total = "total"
          @handleCurrentChange = "handleCurrentChange"
          @delete = "deleteConfirm"
          @update = "update"
          @select = "handleSelectionChange">
        </MyTable> 
        <el-dialog
          :title = "dialogTitle" 
          :visible.sync = "dialogVisible"
          top = "10vh"
          width = "50%"
          :before-close = "handleClose"> 
        <MyForm
          :form = "form"
          ref = "myform"
          :formData = "formData"
          :formItem = "formItem"
          @submit = "submit">
        </MyForm> 
        </el-dialog>
        <MyConfirm 
          ref = "myconfirm"
          :type = "confirmType"
          :title = "confirmTitle"
          :content = "confirmContent">
        </MyConfirm>
      </div> 
  </template>
<script> 
import API from "@/api/api_user.js"; 
import {getField, getFormField, getSearchField }from "@/assets/json/index.js"; 
import {getPageSize, px2rem, rem2px }from "@/plugins/util.js"; 
import {setTimeout }from "timers"; 
export default {
  name:"userList", 
  data() {
    // 表单配置
    var form =  {
      title:"", 
      ref:"form1", 
      showTitle:false, 
      labelWidth:px2rem(140), 
      labelPositon:"right", 
      width:"80%", 
      column:1, 
      hasSubmit:true, 
      submitText:"提交", 
      cancleText:"取消"
    }; 
    // 表格操作配置
    var operation =  {
      nowPage:"userList", 
      show:true, 
      fixed:false, 
      size:"mini", 
      width:80 + rem2px(px2rem(160)), 
      minWidth:500, 
      label:"操作", 
      btns:[ {
          type:"text", 
          size:"mini", 
          content:"编辑", 
          icon:"el-icon-edit-outline", 
          handle:"update", 
          class:"button-operator"
        },  {
          type:"text", 
          size:"mini", 
          content:"删除", 
          icon:"el-icon-delete", 
          handle:"delete", 
          class:"button-operator"
        }
      ]
    }; 
    return {
      // 加载loading初始化
      fullscreenLoading:false, 
      confirmType:"warning", 
      confirmTitle:"提示信息", 
      confirmContent:"此操作将永久删除该数据, 是否继续?", 
      dialogTitle:"添加用户", 
      dialogVisible:false, 
      multipleSelection:[], 
      ids:null, 
      form:form, 
      operation:operation, // 操作按钮
      column:[], 
      data:[], 
      formItem:[], 
      formData: {}, 
      pageSize:getPageSize(), 
      currentPage:1, 
      total:0, 
      type:"saveTask", 
      searchFormData: {}, 
      searchFormItem:[], 
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
    fieldInit() {
      var column = getField("user"); 
      column.forEach(item =>  {
        if ( !!item.width && item.width != "auto") {
          item.width = rem2px(px2rem(item.width)); 
        }
      }); 
      this.column = column; 
    }, 
    formInit() {
      this.formItem = getFormField("user", "item"); 
      this.formData = getFormField("user", "data"); 
    }, 
    searchFormInit() {
      this.searchFormItem = getSearchField("user", "item"); 
      this.searchFormData = getSearchField("user", "data"); 
    }, 
    // 添加数据
    showDialog() {
      this.formInit(); 
      this.dialogTitle = "添加用户"; 
      this.type = "addUser"; 
      this.dialogVisible = true; 
    }, 
    // 更新数据
    update(row) {
      this.formInit(); 
      this.dialogTitle = "编辑用户"; 
      this.type = "updateUserById"; 
      this.dialogVisible = true; 
    }, 
    // 提交数据
    submit() {
      console.log(this.formData); 
      setTimeout(() =>  {
        API[this.type](this.formData).then(res =>  {
          this.dialogVisible = false; 
          this.$message( {
            message:res.msg, 
            type:"success"
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
      var config =  {
        page:_this.currentPage, 
        size:_this.pageSize
      }; 
      // 添加查询字段
      config = $.extend(config, this.searchFormData); 
      // 接口调用
      var options =  {}; 
      this.fullscreenLoading = true; 
      API.findUserList(config).then(res =>  {
        console.log(res); 
        this.data = res.data.rows; 
        this.total = res.data.total; 
        this.fullscreenLoading = false; 
      }).catch(err =>  {
        this.total = 100; 
        this.data = [{
            username:"wangyifan", 
            nickname:"yifanwang", 
            telephone:5556788992, 
            mail:"7777@qq.com", 
            roles:"njjj", 
            rights:"ssss", 
            id:22, 
            operateTime:"2018-10-11"
          },
           {
            username:"wifan3", 
            nickname:"yifang", 
            telephone:55567000992, 
            mail:"77@qq.com", 
            roles:"njjj", 
            rights:"ssss", 
            id:223, 
            operateTime:"2018-10-11"
          }]; 
        this.fullscreenLoading = false; 
      }); 
    }, 
    // 删除
    delete() {
      var _this = this; 
      console.log(_this); 
      API.delUser( {ids:_this.ids }).then(res =>  {
        this.ids = null; 
        this.$message( {
          message:"删除成功", 
          type:"success"
        }); 
        this.getData(); 

      }).catch(err =>  {
         this.$message( {
          message:"删除失败", 
          type:"error"
        }); 
        this.getData(); 
      }); 
    }, 
    // 批量.删除
    deleteBatch() {
      var id = []; 
      this.multipleSelection.forEach(item =>  {
        id.push(item.id); 
      }); 
      if (id.length > 0) {
        this.deleteConfirm( {taskId:id }); 
      }else {
        this.$message( {
          message:"请至少选择一个选项", 
          type:"warning"
        }); 
      }
    }, 
    // 删除确认
    deleteConfirm(row) {
      console.log(row); 
      var _this = this; 
      var ids = []; 
      ids.push(row.id); 
        this.ids = ids.join(); 
        console.log(this.ids); 
      setTimeout(() =>  {
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
      this.getData(); 
    }, 
    exportUserList() {
      console.log("导出用户列表")
    }
  }
};  
</script> 
<style lang = "scss"scoped > 
@import "@/assets/base/variables.scss"; 
button.el-button.pull-right.el-button--default {
    margin-top:6px; 
    margin-left:10px; 
    color:#fff; 
} 
</style > 

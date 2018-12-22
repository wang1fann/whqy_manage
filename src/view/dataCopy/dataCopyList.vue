<template>
    <el-row class="warp">
   <el-row type="flex" justify="start" class="row-button">
        <router-link to="/case/Addcase">
            <el-button type="primary"style="margin-right:20px;">添加案例</el-button>
        </router-link>
        <el-button type="primary" plain @click="delCase" :disabled="this.sels.length===0">批量删除</el-button>
    </el-row>
     <el-table
    :data="data"
    @selection-change="selectionChange"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
        <h5 style="color:#28589A">案例描述</h5>
        <span>{{props.row.descn}}</span>
        </el-form>
      </template>
    </el-table-column>
     <el-table-column
      type="selection"
      align="center"      
      width="55">
    </el-table-column>
    <el-table-column
      label="案例名称"
      align="center"
      prop="name">
    </el-table-column>
    <el-table-column
      label="案例图片"
      align="center"
      prop="picurl">
       <template slot-scope="scope">
       <img :src="scope.row.picurl" class="case_img" alt="图片加载失败">
      </template>
    </el-table-column>
    <el-table-column
      label="案例备注"
      align="center"
      prop="remark">
    </el-table-column>
    <el-table-column
      label="创建时间"
       align="center"
      prop="createtime">
    </el-table-column>
    <el-table-column
      label="更新时间"
       align="center"
      prop="updatetime">
    </el-table-column>
     <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="jumpTo(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-row>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="[pageSize,10,100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-row>
  </el-row>
</template>
<script>

import Data from '@/assets/js/data'
import Btn from '@/components/CellBtn'
import Editor from '@/components/CellEditor'
import DetailBtn from '@/components/CellDetailBtn'
import Vue from 'vue'

import MyDialog from '@/components/MyDialog'
import * as util from '@/api/util.js';
import API from '@/api/api_case';
export default {
     components: {
        'my-dialog': MyDialog
    },
    data() {
        return {
            show: false,
            sels:[],
            addCaseForm: {
                id: 0,          
                Casename: '',
                address: '',//pic工作照片
                number:2,
                salary:'',//薪水
                years:'',//工作年限
                expired:'',
                education:'',
                description:'',
            },
            formLabelWidth:'100',
            total: 0,
            currentPage: 1, 
            pageSize: 5,
            parPageSize: 5,
            data: [],
        }
    },
    created() {
        this.getCaseList();
    },
    methods: {
        jumpTo(row){
            this.$router.push({
                name: '添加案例',
                params:row
            })
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
            console.log(row);
            this.currentPage = row;
            this.getCaseList();
        },
        getCaseList() {
            window.sessionStorage.responseType='json';
            let formData = new FormData();
            formData.append('page',this.currentPage);     
            formData.append('size',this.parPageSize);     
            let that = this;
            API.CaseListPageQuery(formData).then(function(result) {
                console.log(result);
              if(result){
                that.data = result.list;
                that.total = result.total;//总共多少条
              }
            }, function(err) {
                that.$message.error({ showClose: true, message: err.toString(), duration: 2000 });
            }).catch(function(error) {
                that.$message.error({ showClose: true, message: error, duration: 2000 })
            });
        },
        delCase() {
            window.sessionStorage.responseType='form';
            let ids= this.sels.map(item=>item.id).toString();//1,3
            console.log(ids);
            let that = this;
            let formData = new FormData();
            formData.append('ids',ids);
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log("确定");
                let that = this;
                API.CaseDel(formData).then(function(result) {
                    if(result.ret == true){
                        that.$message.success({ showClose: true, message:result.msg, duration: 2000 });
                        that.getCaseList();
                    }
                }, function(err) {
                    that.$message.error({ showClose: true, message:err, duration: 2000 });
                }).catch(function(error) {
                    that.$message.error({ showClose: true, message: error, duration: 2000 })
                });
            }).catch((err) => {
                console.log(err);                
                this.$message({type: 'info', message: '已取消删除' });
            });
        } 
    }
  }
</script>

<style>
  .demo-table-expand label {
    font-weight: bold;
  }
  .case_img{
      width:100px;
      height:100px;
  }
</style>

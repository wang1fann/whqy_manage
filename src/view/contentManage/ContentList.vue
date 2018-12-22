<template>
  <el-row class="warp">
    <el-row type="flex" justify="start" class="row-button">
      <router-link to="/product/producttree">
        <el-button type="primary" style="margin-right:20px;">去产品分类页，添加产品</el-button>
      </router-link>
      <el-button type="primary" plain @click="delProduct" :disabled="this.sels.length===0">批量删除</el-button>
    </el-row>
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
    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[pageSize,10,100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
  </el-row>
</template>
<script>
import Data from "@/assets/js/data";
import Btn from "@/components/CellBtn";
import Editor from "@/components/CellEditor";
import DetailBtn from "@/components/CellDetailBtn";
import Vue from "vue";

import MyDialog from "@/components/MyDialog";
import * as util from "@/api/util.js";
import API from "@/api/api_product";
export default {
  components: {
    "my-dialog": MyDialog
  },
  data() {
    return {
      show: false,
      sels: [],
      addProductForm: {
        id: "",
        name: "", //分类名称
        itemcatId: "", //产品分类id
        desc: "", //产品描述
        pic: "" //产品照片
      },
      formLabelWidth: "100",
      total: 0,
      currentPage: 1,
      pageSize: 5,
      parPageSize: 5,
      data: [],
      columns: [
        { label: "产品名称", prop: "name", width: 150 },
        { label: "产品分类id", prop: "itemcatId", width: 100 },
        { label: "产品分类名称", prop: "itemcatname", width: 120 },
        { label: "产品照片", prop: "picurl", width: 200 },
        { label: "创建时间", prop: "createtime", width: 200 }
      ],
      columnsProps: {
        width: "100%",
        align: "center",
        sortable: true,
        component: Editor
      },
      columnsSchema: {
        产品照片: {
          width: "200px",
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
    this.getProductList();
  },
  methods: {
    picChange(fileval) {
      console.log(fileval);
      this.dialogFormInfo.pic = fileval.target.files[0];
    },
    columnsHandler(cols) {
      let that = this;
      return cols.concat({
        label: "操作",
        align: "center",
        component: DetailBtn,
        // listeners 可用于监听自定义组件内部 $emit 出的事件
        listeners: {
          "row-detail"(row) {
            that.$router.push(
              "/product/addproduct/" + row.itemcatId + "/" + row.id
            );
          }
        }
      });
    },
    selectionChange(rows) {
      this.sels = rows;
    },
    handleSizeChange(val) {
      this.parPageSize = val;
      this.getProductList();
    },
    handleCurrentChange(row) {
      this.currentPage = row;
      this.getProductList();
    },
    getProductList() {
      window.sessionStorage.responseType = "json";
      let formData = new FormData();
      formData.append("page", this.currentPage);
      formData.append("size", this.parPageSize);
      let that = this;
      API.productListPageQuery(formData)
        .then(
          function(result) {
            if (result) {
              that.data = result.list;
              that.total = result.total; //总共多少条
            }
          },
          function(err) {
            var data = [
              {
                role: "SS",
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
    delProduct() {
      window.sessionStorage.responseType = "form";
      let ids = this.sels.map(item => item.id).toString(); //1,3
      console.log(ids);
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
          API.productDel(formData)
            .then(
              function(result) {
                if (result.ret == true) {
                  that.$message.success({
                    showClose: true,
                    message: result.msg,
                    duration: 2000
                  });
                  that.getProductList();
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
.demo-table-expand label {
  font-weight: bold;
}
</style>

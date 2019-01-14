<template>
  <div
    class="content-top-line rights-box"
    v-loading="fullscreenLoading"
  >
    <div
      class="grid-content bg-purple"
      v-for="(item,index) in pageItem"
      :key="index"
    >
      <el-row class="alignleft">
        <img
          style="vertical-align:middle;"
          :src="item.imgIcon"
          alt="图片加载失败"
        > {{item.title}}
      </el-row>
      <el-row
        class="border-all-grey"
        :class="{ 'first-row': index===0}"
      >
        <template v-if=" !!item.radio && item.radio.length > 0">
          <el-row class="rights-radio-bg">
            <el-radio-group v-model="item.radioValue">
              <el-radio
                v-for="(radioitem,index) in item.radio"
                style="margin:0px 10px;"
                :key="index"
                :value="radioitem.value"
                :label="radioitem.label"
                :disabled="radioitem.disabled"
              >{{radioitem.value}}</el-radio>
            </el-radio-group>
          </el-row>
        </template>
        <el-row
          :gutter="24"
          class="main-conent-input200"
        >
          <MySearch
            class="search"
            :formData="item.formData"
            :formItem="item.formInfo"
          ></MySearch>
        </el-row>
      </el-row>
    </div>
    <el-row
      :gutter="20"
      style="margin:50px 0px;"
    >
      <el-button
        size="small"
        type="danger"
        @click="addRightsSubmit"
      >提交</el-button>
      <i style="margin:0px 20px;"></i>
      <el-button
        size="small"
        type="danger"
        @click="resetAddRights"
      >重置</el-button>
    </el-row>
  </div>
</template>
<script>
import API from "@/api/api_rights";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
export default {
  name: "addRights",
  data() {
    return {
      fullscreenLoading: false,
      submitData: {},
      permissionId: "",
      pageItem: [
        {
          title: "权限设置",
          imgIcon: require("@/assets/img/rights/rights.png"),
          radio: [
            { label: "1", name: "role", value: "超级管理员" },
            { label: "2", name: "role", value: "一般管理员" },
            { label: "3", name: "role", value: "普通用户" }
          ],
          radioValue: "1",
          formInfo: [
            {
              type: "text",
              name: "userName",
              value: "",
              placeholder: "请输入用户名",
              label: "用户名",
              width: "100%",
              show: true
            },
            {
              type: "text",
              name: "passwd",
              value: "",
              placeholder: "请输入密码",
              label: "密码",
              width: "100%",
              show: true
            },
            {
              type: "select",
              name: "departmentId",
              cname: "name",
              value: "",
              placeholder: "请选择科室名称",
              filterable: true,
              width: "100%",
              label: "科室名称:",
              show: true,
              options: [{ value: "全部", label: "全部", id: "0" }],
              rules: [
                {
                  required: true,
                  message: "请选择科室名称",
                  trigger: "blur"
                }
              ]
            }
          ],
          formData: {
            buttonShow: false,
            userName: "",
            passwd: "",
            departmentId: ""
          }
        },
        {
          title: "操作权限管理",
          imgIcon: require("@/assets/img/rights/operator.png"),
          radio: [
            {
              label: "全选（超级管理员）",
              name: "operator",
              value: "全选（超级管理员）"
            },
            {
              label: "全部查看（一般用户）",
              name: "operator",
              value: "全部查看（一般用户）"
            }
          ],
          radioValue: "",
          formData: {
            buttonShow: false,
            tbMenusFilter: []
          },
          formInfo: [
            {
              type: "checkbox",
              name: "tbMenusFilter",
              label: "操作权限筛选:",
              show: true,
              value: [],
              options: []
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  computed: {
    setPermissionId() {
      return this.pageItem[0].radioValue;
    }
  },
  watch: {
    setPermissionId(val) {
      this.permissionId = val;
      this.findPermissionList();
      console.log(this.permissionId);
    }
  },
  created() {
    this.getFormInfoData();
    this.permissionId = this.pageItem[0].radioValue;
    this.findPermissionList();
  },
  methods: {
    gotoUrl(path, query) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
    },
    getFormInfoData() {
      // formInfo   初始化加载formInfo 科室选项
      this.pageItem[0].formInfo[2].options = [];
      API.getDepartment().then(res => {
        if (!!res && res.code === 20000) {
          for (var i = 0; i < res.data.length; i++) {
            this.pageItem[0].formInfo[2].options.push({
              value: res.data[i].id,
              label: res.data[i].name,
              id: res.data[i].id
            });
          }
        }
      });
    },
    dataHandle() {
      this.submitData = this.pageItem[0].formData;
      this._.assignIn(this.submitData, this.pageItem[1].formData);
      console.log(this.submitData);
    },
    addRightsSubmit() {
      var that = this;
      that.fullscreenLoading = true;
      var menuArr = [];
      var optionsArr = this.pageItem[1].formInfo[0].options;
      var checkidArr = this.pageItem[1].formData.tbMenusFilter;
      console.log(optionsArr);
      console.log(checkidArr);
      for (let j = 0; j < checkidArr.length; j++) {
        for (let i = 0; i < optionsArr.length; i++) {
          console.log(checkidArr[j]);

          if (checkidArr[j] == optionsArr[i].id) {
            console.log(checkidArr[j]);
            menuArr.push(optionsArr[i]);
          }
        }
      }
      var params = {
        user: {
          userName: this.pageItem[0].formData.userName,
          passwd: this.pageItem[0].formData.passwd,
          departmentId: this.pageItem[0].formData.departmentId,
          permissionId: this.pageItem[0].radioValue
        },
        tbMenus: menuArr
      };
      console.log(params);
      setTimeout(() => {
        API.addAPI(params).then(res => {
          this.$message({
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "warning"
          });
          if (!!res && res.code === 20000) {
            that.gotoUrl("/rights");
          }
        });
      }, 50);
      that.fullscreenLoading = false;
    },
    findPermissionList() {
      this.pageItem[1].formInfo[0].options = [];
      API.findPermissionList({
        permissionId: this.permissionId
      }).then(res => {
        if (!!res && res.code === 20000) {
          for (var i = 0; i < res.data.length; i++) {
            this.pageItem[1].formInfo[0].options.push({
              menuId: res.data[i].menuId,
              value: res.data[i].id,
              id: res.data[i].menuId,
              name: res.data[i].title,
              title: res.data[i].title,
              label: res.data[i].name,
              parentId: res.data[i].parentId,
              isflag: res.data[i].isflag,
              href: res.data[i].href,
              perms: res.data[i].perms,
              icon: res.data[i].icon
            });
          }
        }
      });
    },
    resetAddRights() {
      this._.forEach(this.pageItem[0].formData, function(value, key, item) {
        console.log(item);
        console.log(key);
        item[key] = "";
      });
    }
  }
};
</script>
<style>
.border-all-grey {
  border: 1px solid #ececec;
  padding: 10px 20px;
  margin-top: 10px;
  margin-bottom: 25px;
}

.rights-radio-bg {
  background: #ececec;
  height: 35px;
  line-height: 35px;
}
</style>

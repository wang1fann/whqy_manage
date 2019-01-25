<template>
  <div
    class="content-top-line"
    v-loading="fullscreenLoading"
    element-loading-text="拼命加载中"
  >
    <div class="site-list">
      <el-form
        ref="siteForm"
        :model="siteForm"
        label-width="80px"
      >
        <el-form-item
          :label="item.label"
          v-for="(item,index) in siteInfo"
          :key="index"
        >
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input
                v-model="siteForm[item.name]"
                value=""
                :placeholder="item.placeholder"
                :disabled="!siteForm[item.status]"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-switch
                active-color="#F6AB5A"
                inactive-color="#ececec"
                v-model="siteForm[item.status]"
                active-text="启用"
              >
              </el-switch>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div
        class="demo-menu"
        v-show="showMenuInfo"
        v-for="(menuItem,ind) in menuInfo"
        :key="ind"
      >
        <i
          class="el-icon-close delete-menu"
          @click="deleteConfirm(menuItem)"
        ></i>
        <el-row :gutter="24">
          <el-col
            :span="4"
            style="min-width:100px;"
          > {{!!menuItem.label?menuItem.label:'标题菜单：'}}</el-col>
          <el-col
            :span="20"
            class="alignleft"
          >
            <el-input
              placeholder="请输入菜单标题"
              v-model="menuItem.name"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col
            :span="4"
            style="min-width:100px;"
          >&nbsp;</el-col>
          <el-col
            :span="20"
            class="alignleft"
            style="margin: 20px 0px 0px;"
          >
            <div style="margin-top: 15px;display:inline-block;">
              <el-input
                v-for="(item,index) in !!menuItem.children?menuItem.children:menuItem.menuList"
                :key="index"
                class="child-menu-input"
                placeholder="子菜单标题"
                v-model="item.name"
              >
                <el-button
                  slot="append"
                  icon="el-icon-close"
                  @click="deleteConfirm(item)"
                ></el-button>
              </el-input>
            </div>
            <el-button
              class="child-menu-btn child-menu-btn-plus el-icon-plus"
              @click="addChildMenu(ind)"
            ></el-button>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-button
          type="danger"
          @click="submitSite()"
        >提交</el-button>
      </el-row>
      <el-row
        class="site-bottom"
        v-show="showMenuInfo"
      >
        <span @click="addMenu">
          <i class="el-icon-circle-plus"></i>底部菜单添加</span>
      </el-row>
    </div>
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    ></MyConfirm>
  </div>
</template>

<script>
import API from "@/api/api_site.js";
export default {
  name: "Site",
  data() {
    return {
      fullscreenLoading: false,
      showMenuInfo: false,
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除该文件, 是否继续?",
      id: "",
      siteForm: {
        copyright: "",
        tecSupport: "",
        address: "",
        phone: "",
        copyrightStatus: "true",
        tecSupportStatus: "true",
        addressStatus: "true",
        phoneStatus: "true"
      },
      menuInfo: [
        {
          name: "",
          label: "菜单标题：",
          parentId: "0",
          menuType: 2, //底部菜单传2，导航栏菜单传1
          children: [{ name: "" }]
        }
      ],
      siteInfo: [
        {
          label: "版权声明",
          placeholder: "版权所有 渭华起义数字纪念馆",
          valueFocus: true,
          status: "copyrightStatus",
          name: "copyright"
        },
        {
          label: "技术支持",
          placeholder: "西安赛云溪信息科技有限公司",
          valueFocus: true,
          name: "tecSupport",
          status: "tecSupportStatus"
        },
        {
          label: "联系地址",
          placeholder: "",
          valueFocus: true,
          name: "address",
          status: "addressStatus"
        },
        {
          label: "联系电话",
          placeholder: "",
          valueFocus: true,
          inputValue: "18409209393",
          name: "phone",
          status: "phoneStatus"
        }
      ]
    };
  },
  methods: {
    // 删除确认
    deleteConfirm(row) {
      var _this = this;
      _this.ids = row.id;
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.deleteMenu, "");
      }, 100);
    },
    deleteMenu(item) {
      var _this = this;
      API.delMenu({ id: _this.ids })
        .then(res => {
          this.ids = null;
          this.$message({
            message: res.message,
            type: res.code === 20000 ? "success" : "error"
          });
          this.findMenu();
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    addChildMenu(i) {
      if (!!this.menuInfo[i].children) {
        this.menuInfo[i].children.push({
          name: ""
        });
      }
    },
    addMenu() {
      this.menuInfo.push({
        name: "",
        label: "菜单标题：",
        parentId: "0",
        menuType: 2, //底部菜单传2，导航栏菜单传1
        children: [{ name: "" }]
      });
    },
    findSite() {
      window.sessionStorage.setItem("responseType", "json");
      this.fullscreenLoading = true;
      API.findSiteList()
        .then(res => {
          if (!!res && res.code === 20000) {
            var obj = res.data[0];
            obj.addressStatus = obj.addressStatus === "1" ? true : false;
            obj.copyrightStatus = obj.copyrightStatus === "1" ? true : false;
            obj.tecSupportStatus = obj.tecSupportStatus === "1" ? true : false;
            obj.phoneStatus = obj.phoneStatus === "1" ? true : false;
            this.siteForm = obj;
          }
          this.fullscreenLoading = false;
          this.$message({
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "warning"
          });
        })
        .catch(res => {});
    },
    findMenu() {
      window.sessionStorage.setItem("responseType", "json");
      var that = this;
      API.findMenuList().then(res => {
        if (!!res && res.code === 20000) {
          that.menuInfo = !!res.data
            ? this._.filter(res.data, { parentId: "0" })
            : "";
        }
      });
    },
    submitSite() {
      var params = {};
      params = this.siteForm;
      params.addressStatus = params.addressStatus === true ? "1" : "0";
      params.copyrightStatus = params.copyrightStatus === true ? "1" : "0";
      params.tecSupportStatus = params.tecSupportStatus === true ? "1" : "0";
      params.phoneStatus = params.phoneStatus === true ? "1" : "0";
      API.addSite(params).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        if (!!res && res.code === 20011) {
          //登录已过期
          sessionStorage.removeItem("access-user");
          sessionStorage.removeItem("token");
          var that = this;
          setTimeout(function() {
            that.$router.push({ path: "/login" });
          }, 2000);
          return;
        }
        if (!!res && res.code === 20000) {
          var that = this;
          setTimeout(function() {
            that.findSite();
          }, 1500);
        }
      });
    }
  },
  created() {
    this.findSite();
    this.findMenu();
  }
};
</script>

<style  lang="scss" scoped>
.site-list {
  text-align: center;
  margin: 0px 80px 15px;
  .demo-menu {
    margin-bottom: 15px;
    position: relative;
    background: #ececec;
    padding: 15px 5px;
    .el-input {
      max-width: 800px;
    }
    i.delete-menu {
      position: absolute;
      right: 3px;
      top: 3px;
      cursor: pointer;
      color: #d43537;
    }

    .child-menu-btn {
      background: #fff;
      color: #000;
      border-color: #fff;
      margin: 10px;
      padding: 10px 30px; // cursor: crosshair;
      position: relative;
    }
  }
  button.el-button.child-menu-btn.el-button--default:first-child {
    margin-left: 0px;
  }
  .site-bottom {
    margin: 20px 0px;
    padding: 6px;
    border: 1px solid #ececec;
    i {
      font-size: 20px;
      vertical-align: middle;
      color: #d43537;
      margin-right: 5px;
    }
    span {
      cursor: pointer;
    }
  }
}
</style>

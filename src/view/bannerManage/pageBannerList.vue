<template>
  <div class="content-top-line">
    <div class="banner-list">
      <div
        class="demo-menu"
        v-for="(menuItem,ind) in menuInfo"
        :key="ind"
      >
        <i
          class="el-icon-close delete-menu"
          @click ="deleteConfirm(menuItem)"
        ></i>
        <el-row :gutter="20">
          <el-col
            :span="4"
            style="min-width:100px;"
          > {{!!menuItem.label?menuItem.label:"导航栏菜单标题："}}</el-col>
          <el-col
            :span="16"
            class="alignleft"
          >
            <el-input
              placeholder="请输入菜单标题"
              v-model="menuItem.name"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col
            :span="4"
            style="min-width:100px;"
          >&nbsp;</el-col>
          <el-col
            :span="16"
            class="alignleft"
            style="margin: 20px 0px 0px;"
          >
            <div style="margin-top: 15px;display:inline-block;">
              <el-input
                v-for="(item,index) in menuItem.children"
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
                  <!-- @click="deleteChildMenu(item,ind)" -->
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
      <el-row class="site-bottom">
        <span @click="addMenu">
          <i class="el-icon-circle-plus"></i>导航栏菜单添加</span>
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
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除该文件, 是否继续?",
      siteForm: {
        copyRight: "",
        skillSupport: "",
        contactAddress: "",
        contactPhone: ""
      },
      ids:'',
      menuInfo: [
        {
          name: "",
          label: "菜单标题：",
          parentId: "0",
          menuType: 1, //底部菜单传2，导航栏菜单传1
          children: [{ name: "" }]
        }
      ]
    };
  },
  methods: {
    // 删除确认
    deleteConfirm(row) {
      var _this = this;
      console.log(row);
      _this.ids = row.id;
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.deleteMenu, '');
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
      this.menuInfo[i].children.push({
        name: ""
      });
    },
    deleteChildMenu(item, i) {
      var index = this.menuInfo[i].children.indexOf(item);
      if (index !== -1) {
        this.menuInfo[i].children.splice(index, 1);
      }
    },
    addMenu() {
      this.menuInfo.push({
        name: "",
        label: "菜单标题：",
        parentId: "0",
        menuType: 1, //底部菜单传2，导航栏菜单传1
        children: [{ name: "" }]
      });
    },
    findMenu() {
      var that = this;
      API.findMenuList().then(res => {
        console.log(res);
        if (!!res && res.code === 20000) {
          that.menuInfo = !!res.data
            ? this._.filter(res.data, { parentId: "0", menuType: 1 })
            : "";
        }
      });
    },
    submitSite() {
      console.log(this.menuInfo);
      API.addSite(this.menuInfo).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        if (!!res && res.code === 20000) {
          this.findMenu();
        }
      });
    }
  },
  created() {
    this.findMenu();
  }
};
</script>

<style  lang="scss" scoped>
.banner-list {
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
      margin: 0px;
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

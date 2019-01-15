<template>
  <div class="container">
    <!--头部-->
    <div class="topbar-wrap">
      <div
        class="topbar-logos"
        v-show="!collapsed"
      ></div>
      <div class="topbar-account">
        <span class="user-info">
          <i
            style="font-size:30px;vertical-align:middle;"
            class="fa fa-user-circle-o"
          ></i>
          <span v-show="userInfo.sex === '2'">您好！ {{userInfo.userName}}先生</span>
          <span v-show="userInfo.sex !== '2'">您好！ {{userInfo.userName}}女士</span>
        </span>
        <span class="user-set-up">
          <i
            style="font-size:15px;vertical-align:middle;"
            class="fa fa-refresh"
            @click="$router.go(0)"
          ></i>
          <i
            style="font-size:15px;vertical-align:middle;"
            @click="gotoUrl('/login')"
            class="fa fa-power-off"
          ></i>
        </span>
      </div>
    </div>
    <!--中间-->
    <el-col
      :span="24"
      class="main"
    >
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <div
          class="menu-toggle"
          @click.prevent="collapse"
        >
          <i
            class="fa fa-bars"
            aria-hidden="true"
            v-show="!collapsed"
          ></i>
          <i
            class="fa fa-bars"
            v-show="collapsed"
          ></i>
        </div>
        <!--导航菜单-->
        <el-menu
          :default-active="$route.path"
          class="mar-l el-menu-vertical-demo el-col el-col-3"
          background-color="#fff"
          text-color="#000"
          active-text-color="#ffd04b"
          light
          router
        >
          <template v-for="(item,index) in $router.options.routes[1].children">
            <el-menu-item
              :index="item.path"
              :key="index"
              v-if="item.show!==false"
            >
              <i class="menu-i">
                <img
                  :src="item.img"
                  alt
                >
              </i>
              {{item.name}}
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col
            :span="24"
            class="content-wrapper"
          >
            <el-bread v-if="$route.path.search('/contentManage') === -1"></el-bread>
            <transition
              name="fade"
              mode="out-in"
            >
              <keep-alive>
                <router-view style="min-width:1380px;"></router-view>
              </keep-alive>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </div>
</template>
<script>
import { bus } from "../bus.js";
import API from "../api/api_rights";
import ElBread from "../components/ElBread"; //面包屑

export default {
  name: "home",
  components: {
    "el-bread": ElBread
  },
  data() {
    return {
      defaultActiveIndex: "0",
      userInfo: {
        userName: "wangyifan",
        sex: "1"
      },
      menuRouter: "",
      breads: "",
      collapsed: false,
      currentRouterIsContent: false
    };
  },
  created() {
    this.menuRouter = _.filter(this.$router.options.routes, function(o) {
      return !!o.menuShow;
    });
    bus.$on("setNickName", text => {
      console.log(text);
      this.user.name = text;
    });
    bus.$on("goto", url => {
      if (url === "/login") {
        localStorage.removeItem("access-user");
        localStorage.removeItem("token");
      }
      this.$router.push(url);
    });
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      let user = localStorage.getItem("access-user");
      if (user) {
        user = JSON.parse(user);
        this.userInfo = user;
      }
    },
    gotoUrl(path, query) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
      window.sessionStorage.clear();
    },
    handleSelect(index, indexPath) {
      this.defaultActiveIndex = index;
      this.breads = indexPath;
    },
    handleMenuSelect(index, indexPath) {
      this.breads = indexPath;
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    jumpTo(url) {
      this.defaultActiveIndex = url;
      this.$router.push(url); //用go刷新
    },
    logout() {
      let that = this;
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonClass: "el-button--warning"
      })
        .then(() => {
          //确认
          that.loading = true;
          API.logout()
            .then(
              function(result) {
                that.loading = false;
                localStorage.removeItem("access-user");
                that.$router.go("/login"); //用go刷新
              },
              function(err) {
                that.loading = false;
                that.$message.error({
                  showClose: true,
                  message: err.toString(),
                  duration: 2000
                });
              }
            )
            .catch(function(error) {
              that.loading = false;
              that.$message.error({
                showClose: true,
                message: "请求异常，请重新操作",
                duration: 2000
              });
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .topbar-wrap {
    width: 100%;
    background: url("../assets/img/access/header_bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0px;
    height: 80px;
    .topbar-btn {
      color: #fff;
    }
    .topbar-logo {
      float: left;
      width: 59px;
      line-height: 26px;
    }
    .topbar-logos {
      float: left;
      width: 120px;
      line-height: 26px;
    }
    .topbar-logo img,
    .topbar-logos img {
      height: 38px;
      margin-top: 5px;
      margin-left: -10px;
    }
    .topbar-account {
      float: right;
      color: #fff;
      opacity: 0.8;
      padding-right: 12px;
      margin-top: 15px;
      font-size: 14px;
      .user-info {
        height: 22px;
        vertical-align: middle;
      }
      .user-set-up {
        border-left: 1px solid #fff;
        opacity: 0.7;
        height: 22px;
        vertical-align: middle;
        margin-left: 10px;
        padding-left: 15px;
        i {
          cursor: pointer;
          padding-right: 10px;
        }
      }
    }
  }

  .main {
    background: #dee5e6;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 57px;
    bottom: 0px;
    overflow: hidden;
  }

  aside {
    i.fa.fa-bars {
      color: #fff;
    }
    min-width: 60px;
    background: #fff;
    overflow: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .menu-toggle {
      background: #e67879;
      text-align: center;
      height: 26px;
      line-height: 30px;
      cursor: pointer;
    }
    .el-menu {
      height: 100%;
      /*写给不支持calc()的浏览器*/
      height: -moz-calc(100% - 80px);
      height: -webkit-calc(100% - 80px);
      height: calc(100% - 80px);
      border-radius: 0px;
      background-color: #fff;
      border-right: 0px;
      width: 60px;
    }

    .el-menu .el-menu-item {
      min-width: 60px;
      overflow: hidden;
      color: #fff;
      height: 46px;
      line-height: 46px;
      .menu-i {
        vertical-align: middle;
        background: #ececec;
        padding: 7px;
        border-radius: 100%;
        width: 30px;
        height: 30px;
        margin-left: -5px;
        margin-right: 40px;
        img {
          margin: 0 auto;
          vertical-align: middle;
          margin-top: -5px;
        }
      }
      span {
        margin-left: 5px;
        border: 2px solid green;
      }
    }
    .el-menu-item:hover,
    .el-submenu .el-menu-item:hover {
      background-color: #eff5f8 !important;
      color: #000;
    }

    .el-menu-item.is-active {
      background-color: #eff5f8 !important;
      color: #000 !important;
      border-left: 2px solid #e04646;
    }
    &.showSidebar {
      overflow-x: hidden;
      overflow-y: auto;
      .el-menu {
        width: 150px;
      }
      .menu-i {
        margin-left: 0px;
        margin-right: 5px !important;
      }
    }
  }

  .content-container {
    background: #fff;
    flex: 1;
    padding: 10px;
    margin: 10px;
    overflow-y: auto;
    .content-menu {
      margin-bottom: 20px;
    }
    .grid-content {
      // padding: 10px;
      padding-bottom: 1px;
      margin: 10px;
    }
    .content-wrapper {
      background-color: #fff;
      box-sizing: border-box;
    }
  }
}
</style>

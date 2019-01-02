<template>
  <div class="me">
    <div class="tabs">
      <ul>
        <router-link
          v-for="(item,index) in $router.options.routes[1].children[3].children"
          :key="index"
          :to="{name: item.name}"
          tag="li"
          v-show="!item.show&&item.show!==false"
        >{{item.name}}</router-link>
      </ul>
    </div>
    <div class="content-manage">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-bread @currentContentRouter="MenuArr"></el-bread>
        </el-col>
        <el-col :span="12">
          <div
            class="child-menu-box"
            v-if="!!childMenuArr && !!childMenuArr.children && childMenuArr.children.length>0  "
          >
            <router-link
              v-for="(item,index) in childMenuArr.children"
              :key="index"
              :to="{name: item.name}"
              v-show="!item.show&&item.show!==false"
              tag="el-button"
            >{{item.name}}</router-link>
          </div>
        </el-col>
      </el-row>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import ElBread from "@/components/ElBread"; //面包屑
export default {
  name: "contentManage",
  components: {
    "el-bread": ElBread
  },
  data() {
    return {
      subMenus: [],
      childMenuArr: { children: [] }
    };
  },
  created() {},
  mounted() {},
  methods: {
    MenuArr(val) {
      console.log(val);
      this.childMenuArr = !!val && val !== undefined ? val : "";
    }
  },
  watch: {}
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.me {
  .tabs {
    margin: -21px;
    margin-bottom: 10px;
    border-bottom: 10px solid #dee5e6;
    & > ul,
    & > ul > li {
      margin: 0;
      padding: 0;
      list-style: none;
      cursor: pointer;
    }
    & > ul {
      display: flex;
      border-bottom: #cccccc solid 1px;
      & > li {
        flex: 1;
        text-align: center;
        padding: 10px 0px;
        &.router-link-active {
          color: #d0021b;
          border-bottom: 2px solid #d0021b;
        }
      }
    }
  }
}
</style>

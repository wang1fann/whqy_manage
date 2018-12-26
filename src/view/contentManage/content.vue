
<template>
  <div class="me">
    <div class="tabs">
      <ul>
        <router-link v-for="(item,index) in $router.options.routes[1].children[3].children" :key="index" :to="{name: item.name}" tag="li" >{{item.name}}</router-link>
      </ul>
    </div>
    <div class="content-manage">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-bread></el-bread>
        </el-col>
        <el-col :span="10">
          <right-tab v-if="$route.path.search('/senceNews') === -1 && $route.path.search('/redEducation') === -1"></right-tab>
        </el-col>
      </el-row>

      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import ElBread from "@/components/ElBread";//面包屑
import RightTab from "../../components/rightTab";
export default {
  name:"contentManage",
 components: {
   RightTab,
    "el-bread": ElBread,
  },
  data() {
    return {
      
    }
  },
  created() {
    console.log(this.$router.options.routes[1].children[3].children);
  },
  methods: {
    
  },
}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
  .me{
    .tabs{
      margin: -21px;
      margin-bottom: 10px;
      border-bottom: 10px solid #dee5e6;
      & > ul, & > ul > li {
        margin: 0;
        padding: 0;
        list-style: none;
        cursor: pointer;
      }
      & > ul{
        display: flex;
        border-bottom: #cccccc solid 1px;
        & > li{
          flex: 1;
          text-align: center;
          padding: 10px;
          &.router-link-active {
            color: #D0021B;
            border-bottom: 2px solid #D0021B;
          }
        }
      }
    }
  }
</style>

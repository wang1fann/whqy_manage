

<template>
  <div class="contenttab">

  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  created() {},
  data() {
    return {};
  },
  methods: {
    // getBreadcrumb() {
    //   console.log(this.$route.matched);
    //   this.breadlist = this.$route.matched;
    // }
  },
  watch: {
    // $route() {
    //   this.getBreadcrumb();
    // }
  }
};
</script>
<style lang="scss">
.el-breadcrumb {
  width: 80%;
  margin: 0px 0px 10px;
  font-size: $fontsize14;
  .el-breadcrumb__item:last-child .el-breadcrumb__inner,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color: #d43537;
  }
  .el-breadcrumb__inner {
    i {
      color: #d43537;
      margin-right: -3px;
    }
    span {
      color: #bbb;
    }
  }
}
</style>

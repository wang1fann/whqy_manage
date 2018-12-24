
<template>
  <div class="me">
    <div class="tabs">
      <ul>
        <!--<router-link :to="{name: 'Default'}" tag="li" exact>默认内容</router-link>-->
        <router-link :to="{name: '权限列表'}" tag="li" >内容列表</router-link>
        <router-link :to="{name: '添加权限'}" tag="li">添加权限</router-link>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
  .me{
    .tabs{
      & > ul, & > ul > li {
        margin: 0;
        padding: 0;
        list-style: none;
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
          }
        }
      }
    }
  }
</style>

<template>
<div class="block">
<el-form ref="userform" :model="userform" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="userform.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="userform.userpwd"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">修改</el-button>
    <!--<el-button>取消</el-button>-->
  </el-form-item>
</el-form>
</div>
  
</template>
<script>
  export default {
    data() {
      return {
        userform: {
          username: '',
          userpwd: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
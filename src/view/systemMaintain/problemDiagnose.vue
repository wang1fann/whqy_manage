<template>
  <div class="content-top-line" style="margin:0 auto;width:100%;">
    <div class="content-manage" style="width:80%;margin: 0 auto;">
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入要解决的问题" v-model="input4" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  }
}
</script>
<style  lang="scss" scoped>
.content-manage {
  width: 90%;
  margin: 0 auto;
}
</style>


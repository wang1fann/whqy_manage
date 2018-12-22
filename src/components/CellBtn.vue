<template>
  <div>
    <el-button class="button-operator" type="primary" @click="todo">{{ row._edit ? '完成' : '编辑' }}</el-button>
    <i class="col-line"></i>
    <el-button class="button-operator" type="primary" @click="todo">删除</el-button>
  </div>
  <!-- row-delete -->
</template>
<script>
export default {
  props: ["row", "col"],
  methods: {
    todo() {
      console.log(this.row);
      this.$emit(
        !!operator - type && row - editor === "row-editor"
          ? "row-editor"
          : "row-delete",
        this.row
      );
      this.$set(this.row, "_edit", !this.row._edit);
      /* Vue.set( target, key, value )
        target：要更改的数据源(可以是对象或者数组)，
        key：要更改的具体数据，
        value ：重新赋的值
       */
    }
  }
};
</script>
<style>
button.el-button.button-operator.el-button--primary {
  background: none !important;
  border: none !important;
  color: #d43537;
}
.col-line {
  border-right: 1px solid #eceeee;
  height: 100%;
}
</style>

<template>
    <el-button type="primary"  @click="todo">
     {{ row._detail ? '完成' : '详情' }}
</el-button>

</template>
<script>
export default {
    props: ['row', 'col'],
    methods: {
        todo() {
            console.log(this.row);
            this.$emit('row-detail', this.row);
            this.$set(this.row, '_detail', !this.row._detail);
            // Vue.set( target, key, value ),target：要更改的数据源(可以是对象或者数组)，key：要更改的具体数据，value ：重新赋的值
        }
    }
}
</script>
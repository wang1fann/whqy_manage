<template>
    <div>
        <el-input  v-show="row._edit" type="text" v-model="row[col.prop]"></el-input>
        <span v-show="!row._edit">{{ text }}</span>
    </div>
</template>

<script>
export default {
    props: ['row', 'col'],
    computed: {
        text() {
            return this.row[this.col.prop]
        }
    }
}
</script>
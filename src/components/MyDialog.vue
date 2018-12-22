<template>
    <div class="dialog-container">
    <el-dialog :visible.sync="visible" :show="show" :title="title"
        @close="$emit('updateshow', false)">
        <slot></slot>
    </el-dialog>
    </div>
</template>

<script>
export default {
    name:'MyDialog',
    components:{
    },
    data() {
        return {
            visible: this.show,
        };
    },
    created() {
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title:{
            type:String,
            default:"标题ss"
        }
    },
    watch: {
         show() {
            this.visible = this.show;
            this.title=this.title
        }
    },
    methods:{
    }
};
</script>
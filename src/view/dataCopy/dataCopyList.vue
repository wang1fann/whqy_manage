<template>
    <div class="content-top-line">
        <div class="data-list">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">
                    用户管理

                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second">
                    配置管理

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'second'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>

<style  lang="scss" scoped>
.data-list {}
</style>

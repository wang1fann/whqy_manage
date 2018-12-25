<template>
    <div class="content-top-line">
        <div class="banner-list">
        <div class="demo-menu" v-for="(menuItem,ind) in menuInfo" :key="ind">
            <i class="el-icon-close delete-menu" @click="deleteMenu(menuItem)"></i>
            <el-row :gutter="20">
                <el-col :span="4" style="min-width:100px;" > {{menuItem.label}}</el-col>
                <el-col :span="16" class="alignleft">
                    <el-input placeholder="请输入菜单标题" v-model="menuItem.menuTitleVal">
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" style="min-width:100px;">&nbsp;</el-col>
                <el-col :span="16" class="alignleft" style="margin: 20px 0px 0px;">
                    <el-button class="child-menu-btn" v-for="(item,index) in menuItem.menuChild" :key="index">
                        {{item.name}}
                        <i class="el-icon-close delete-menu" @click="deleteChildMenu($event,ind)"></i>
                    </el-button>
                    <el-button class="child-menu-btn child-menu-btn-plus el-icon-plus" @click="addChildMenu(ind)"></el-button>
                </el-col>
            </el-row>
        </div>
        <el-row class="site-bottom">
            <span @click="addMenu">
                <i class="el-icon-circle-plus"></i>导航栏菜单添加</span>
        </el-row>
    </div>
    </div>
</template>

<script>
export default {
    name: "Site",
    data() {
        return {
            siteForm: {
                copyRight: '',
                skillSupport: '',
                contactAddress: '',
                contactPhone: '',
            },
            menuInfo: [
            {
                menuTitleVal: '',
                label: "菜单标题：",
                menuChild: [{ name: "新菜单" }],
            }]
        }
    },
    methods: {
        deleteMenu(item) {
            var index = this.menuInfo.indexOf(item);
            if (index !== -1) {
                this.menuInfo.splice(index, 1)
            }
        },
        addChildMenu(i) {
            this.menuInfo[i].menuChild.push({ name: "新菜单" + Math.floor(Math.random() * 20) + 1 });
        },
        deleteChildMenu(event, i) {
            this.menuInfo[i].menuChild = this._.remove(this.menuInfo[i].menuChild, function(n) {
                return n.name !== event.currentTarget.parentNode.innerText
            });
        },
        addMenu() {
            this.menuInfo.push({
                menuTitleVal: '',
                label: "菜单标题：",
                menuChild: [{ name: "新菜单" }],
            })
        }
    },
    created() {

    }
}
</script>

<style  lang="scss" scoped>
.banner-list {
    text-align: center;
     margin:0px 80px 15px;
    .demo-menu {
       margin-bottom: 15px;
        position: relative;
        background: #ececec;
        padding: 15px 5px;
        .el-input {
            max-width: 800px;
        }
        i.delete-menu {
            position: absolute;
            right: 3px;
            top: 3px;
            cursor: pointer;
            color: #d43537;
        }
        .child-menu-btn {
            background: #fff;
            color: #000;
            border-color: #fff;
            margin: 10px;
            padding: 10px 30px; // cursor: crosshair;
            position: relative;
        }
    }
    button.el-button.child-menu-btn.el-button--default:first-child {
        margin-left: 0px;
    }
    .site-bottom {
        margin: 20px 0px;
        padding: 6px;
        border: 1px solid #ececec;
        i {
            font-size: 20px;
            vertical-align: middle;
            color: #d43537;
            margin-right: 5px;
        }
        span {
            cursor: pointer;
        }
    }
}
</style>

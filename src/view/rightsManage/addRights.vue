<template>
    <div class="content-top-line">
        <div class="grid-content bg-purple" v-for="(item,index) in pageItem" :key="index">
            <el-row class="alignleft">
                <img style="vertical-align:middle;" :src="item.imgIcon" alt="图片加载失败"> {{item.title}}
            </el-row>
            <el-row class="border-all-grey">
                <template v-if=" !!item.radio && item.radio.length > 0">
                    <el-row class="rights-radio-bg">
                        <el-radio-group v-model="item.radioValue">
                            <el-radio v-for="(radioitem,index) in item.radio" style="margin:0px 10px;" :key="index" :label="radioitem.label" :disabled="radioitem.disabled">{{radioitem.label}}</el-radio>
                        </el-radio-group>
                    </el-row>
                </template>
                <el-row :gutter="24" class="main-conent-input200">
                    <MySearch class="search" :formData="item.formData" :formItem="item.formInfo"></MySearch>
                </el-row>
            </el-row>
        </div>
        <el-row :gutter="20" style="margin:50px 0px;">
            <el-button size="small" type="danger" @click="addRightsSubmit">提交</el-button>
            <i style="margin:0px 20px;"></i>
            <el-button size="small" type="danger" @click="resetAddRights">重置</el-button>
        </el-row>
    </div>
</template>
<script>
import API from '@/api/api_rights';
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
export default {
    name: "addRights",
    data() {
        return {
            submitData: {},
            pageItem: [
                {
                    title: "权限设置",
                    imgIcon: require('@/assets/img/rights/rights.png'),
                    radio: [{ label: "超级管理员", name: "role" }, { label: "一般管理员", name: "role" }, { label: "普通用户", name: "role" }],
                    radioValue: '',
                    formInfo: [
                        {
                            "type": "text",
                            "name": "name",
                            "value": "",
                            "placeholder": "请输入用户名",
                            "label": "用户名",
                            "width": "100%",
                            "show": true
                        }, {
                            "type": "text",
                            "name": "password",
                            "value": "",
                            "placeholder": "请输入密码",
                            "label": "密码",
                            "width": "100%",
                            "show": true
                        }, {
                            "type": "select",
                            "name": "section",
                            "cname": "name",
                            "value": "",
                            "placeholder": "请选择科室名称",
                            "filterable": true,
                            "width": "100%",
                            "label": "科室名称:",
                            "show": true,
                            "options": [],
                            "rules": [{
                                "required": true,
                                "message": "请选择科室名称",
                                "trigger": "blur"
                            }]
                        }],
                    formData: { "buttonShow": false, name: "", password: "", section: "" }
                },
                {
                    title: "操作权限管理",
                    imgIcon: require('@/assets/img/rights/operator.png'),
                    radio: [{ label: '全选（超级管理员）', name: 'operator' }, { label: '全部查看（一般用户）', name: 'operator' }],
                    radioValue: '',
                    formData: { "buttonShow": false, "operatorFilter": ["userManage", "memory", "scenicCase", "scenicNews", "collection"] },
                    formInfo: [{
                        "type": "checkbox",
                        "name": "operatorFilter",
                        "label": "操作权限筛选:",
                        "show": true,
                        "value": [],
                        "options": [
                            // 用户管理 内存管理 景区概况 景区新闻  藏品欣赏 渭华起义介绍 先烈事迹 习老精神 红色教育 
                            {
                                "id": "userManage",
                                "name": "用户管理",
                            },
                            {
                                "id": "memory",
                                "name": "内存管理"
                            },
                            {
                                "id": "scenicCase",
                                "name": "景区概况"
                            }, {
                                "id": "scenicNews",
                                "name": "景区新闻"
                            },
                            {
                                "id": "collection",
                                "name": "藏品欣赏"
                            }
                        ]
                    }],
                }
            ]
        }
    },
    mounted() {
    },
    methods: {
        dataHandle() {
            this.submitData = this.pageItem[0].formData;
            this._.assignIn(this.submitData, this.pageItem[1].formData)
            console.log(this.submitData);
        },
        addRightsSubmit() {
            this.dataHandle();
            // setTimeout(() => {
            //     API[this.type](this.formData).then(res => {
            //         this.dialogVisible = false;
            //         this.$message({
            //             message: res.msg,
            //             type: "success"
            //         });
            //         this.getData();
            //     });
            // }, 50);
        },
        resetAddRights() {
            this._.forEach(this.pageItem[0].formData, function(value, key,item) {
                console.log(item);
                console.log(key);
                item[key]="";
            });
        }

    }
}
</script>
<style>
.border-all-grey {
    border: 1px solid #ececec;
    padding: 10px 20px;
    margin-top: 10px;
    margin-bottom: 25px;
}

.rights-radio-bg {
    background: #ececec;
    height: 35px;
    line-height: 35px;
}
</style>

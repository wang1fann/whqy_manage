// 产品相关api

import * as API from './'

export default {
    // 产品分类相关接口
    addCategory: params => { //添加产品分类
        if (params.get('id') != "" && params.get('id') != undefined) {
            return API.POST('/blstation-web/itemcat/update', params); //产品分类更新
        } else {
            return API.POST('/blstation-web/itemcat/add', params)
        }
    },
    findCategoryList: params => { //categoryList
        return API.POST('/blstation-web/itemcat/list', params); //获取产品分类列表
    },
    categoryDel: params => { ///itemcat/delete
        return API.POST('/blstation-web/itemcat/delete', params)
    },
    // 获取所you分类的父节点
    getItem: params => {
        return API.POST('/blstation-web/itemcat/getItemCatListByParentId/', params)
    },
    getItemCatListByParentId: params => {
        return API.POST('/blstation-web/itemcat/getItemCatListByParentId/' + params.id, '')
    },

    // 产品相关接口
    addProduct: params => { //添加产品
        if (params.get('id') != "" && params.get('id') != undefined) {
            return API.POST('/blstation-web/item/update', params); //产品更新
        } else {
            return API.POST('/blstation-web/item/add', params); //产品添加
        }
    },
    productListPageQuery: params => {
        return API.POST('/blstation-web/item/pageQuery', params); //获取产品列表
    },
    productDel: params => {
        return API.POST('/blstation-web/item/delete', params); //产品列表删除
    },
    getChoicePrentData: params => {
        return API.POST('/blstation-web/item/getChoiceParent', params); //产品列表删除
    },
    findOneDetail: params => { //通过产品id查询产品详情
        return API.POST('/blstation-web/item/findById', params);
    }
}
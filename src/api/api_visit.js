// /case/pageQuery
// 产品相关api

import * as API from '.'

export default {
    // 案例相关接口
    addCase: params => { //添加产品
        if (params.get('id') != "" && params.get('id') != undefined) {
            return API.POST('/blstation-web/case/update', params); //产品更新
        } else {
            return API.POST('/blstation-web/case/add', params); //产品添加
        }
    },
    CaseListPageQuery: params => {
        return API.POST('/blstation-web/case/pageQuery', params); //获取产品列表
    },
    CaseDel: params => {
        return API.POST('/blstation-web/case/delete', params); //产品列表删除
    },
    // /case/findOne
    findOneDetail: params => {
        return API.POST('/blstation-web/case/findOne', params); //产品列表删除
    }
}
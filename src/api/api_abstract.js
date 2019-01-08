import * as API from '.'

export default {
    findhongselvyou: params => {
        // http://192.168.0.119:9014/syx/hongselvyou/search/1/2 根据条件搜索接口
        return API.POST('/syx/hongselvyou/search/' + params.page + '/' + params.size, params)
    },

    addAbstarct: params => {
        // /syx/hongselvyouPinglunbiao 添加文章评论
        return API.POST('/syx/hongselvyouPinglunbiao', params)
    },
    //删除
    delAbstarct: params => {
        return API.DELETE('/syx/hongselvyou/delete', params);
    },
    // 服务指南
    // 添加信息
    addServerInfo: params => {
        return API.POST('/syx/fuwuzhinan', params)
    }

}
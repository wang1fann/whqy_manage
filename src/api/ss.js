import * as API from '.'

export default {
    findhongselvyou: params => {
        // http://192.168.0.119:9014/syx/hongselvyou/search/1/2 根据条件搜索接口
        return API.POST('/syx/dangxingjiaoyu/search/' + params.page + '/' + params.size, params)
    },

    addAbstarct: params => {
        // /syx/dangxingjiaoyuPinglunbiao 添加文章评论
        return API.POST('/syx/dangxingjiaoyu/Pinglunbiao', params)
    },
    //删除
    delAbstarct: params => {
        return API.DELETE('/syx/dangxingjiaoyu/delete', params);
    },
    // 服务指南
    // 添加信息
    addServerInfo: params => {
        // return API.POST('/syx/dangxingjiaoyu', params)
        if (!!params.id && params.id != "" && params.id != undefined) {
            return API.POST('/syx/dangxingjiaoyu/' + params.id, params);
        } else {
            return API.POST('/syx/dangxingjiaoyu', params);
        }

        // localhost:9014/syx/dangxingjiaoyu/1077497926311350272 编辑
    },
    // /syx/dangxingjiaoyu/search
    findFormData: params => {
        return API.POST('/syx/dangxingjiaoyu/search/1/30', params)
    },


}
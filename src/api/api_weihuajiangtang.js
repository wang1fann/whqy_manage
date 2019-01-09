import * as API from '.'

export default {
    findhongselvyou: params => {
        return API.POST('/syx/weihuajiangtang/search/' + params.page + '/' + params.size, params)
    },
    //删除
    delAbstarct: params => {
        return API.DELETE('/syx/hongselvyou/delete', params);
    },
    // 服务指南
    // 添加信息
    addServerInfo: params => {
        return API.POST('/syx/weihuajiangtang', params)
    }
}
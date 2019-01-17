import * as API from '.'

export default {
    findData: params => {
        return API.POST('/syx/weihuajiangtang/search/' + params.page + '/' + params.size, params)
    },
    //删除
    delAPI: params => {
        return API.DELETE('/syx/weihuajiangtang/delete', params);
    },
    // 服务指南
    // 添加信息
    addServerInfo: params => {
        if (!params.id) {
            return API.POST('/syx/weihuajiangtang', params)
        } else {
            return API.PUT('/syx/weihuajiangtang/' + params.id, params)
        }
    }
}
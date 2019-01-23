import * as API from '.'

export default {
    // 上传图片
    uploadImg: params => {
        return API.POST('/syx/file/multipleUpload', params)
    },
    findhongselvyou: params => { //查询列表
        return API.POST('/syx/hongselvyou/search/' + params.page + '/' + params.size, params)
    },
    addFormInfo: params => {
        if (!!params.id && params.id != "" && params.id != undefined) {
            return API.PUT('/syx/hongselvyou/' + params.id, params);
        } else {
            return API.POST('/syx/hongselvyou', params)
        }
    },
    // 删除
    delAbstarct: params => {
        return API.DELETE('/syx/hongselvyou/delete', params);
    },
    // 添加信息
    addServerInfo: params => {
        if (!!params.id && params.id != "" && params.id != undefined) {
            return API.PUT('/syx/fuwuzhinan/' + params.id, params);
        } else {
            return API.POST('/syx/fuwuzhinan', params)
        }
    },
    findfuwuzhinan: params => {
        return API.POST('/syx/fuwuzhinan/search/1/30', params)
    }
}
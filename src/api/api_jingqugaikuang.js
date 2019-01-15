import * as API from '.'

export default {
    findjingqugaikuangList: params => {
        return API.POST('/syx/jingqugaikuang/search/' + params.page + '/' + params.size, params)
    },
    addAPI: params => {
        if (!!params.id) {
            return API.PUT(`/syx/jingqugaikuang/` + params.id, params)
        } else {
            return API.POST(`/syx/jingqugaikuang/`, params)
        }
    },
    //单个删除book
    delAPI: params => {
        return API.DELETE('/syx/jingqugaikuang/delete', params);
    },
    findFormData: params => {
        params.page = !!params.page ? params.page : 1;
        params.size = !!params.size ? params.size : 10;
        return API.POST('/syx/jingqugaikuang/search/' + params.page + '/' + params.size, params)
    },
    addFormInfo: params => {
        if (!!params.id && params.id != "" && params.id != undefined) {
            return API.PUT('/syx/jingqugaikuang/' + params.id, params);
        } else {
            return API.POST('/syx/jingqugaikuang', params)
        }
    },
    // 上传图片
    uploadImg: params => {
        return API.POST('/syx/file/multipleUpload', params)
    }
}
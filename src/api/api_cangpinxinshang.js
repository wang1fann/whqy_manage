import * as API from '.'

export default {
    findList: params => {
        return API.POST('/syx/cangpinxinshang/search/' + params.page + '/' + params.size, params)
    },
    addAPI: params => {
        if (!!params.id) {
            return API.PUT(`/syx/cangpinxinshang/` + params.id, params)
        } else {
            return API.POST(`/syx/cangpinxinshang/`, params)
        }
    },
    //单个删除book
    delAPI: params => {
        return API.DELETE('/syx/cangpinxinshang/delete', params);
    },
    findFormData: params => {
        params.page = !!params.page ? params.page : 1;
        params.size = !!params.size ? params.size : 10;
        return API.POST('/syx/cangpinxinshang/search/' + params.page + '/' + params.size, params)
    },
    // 上传图片
    uploadImg: params => {
        return API.POST('/syx/file/multipleUpload', params)
    }
}
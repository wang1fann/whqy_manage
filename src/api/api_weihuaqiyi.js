import * as API from '.'

export default {
    findList: params => {
        return API.POST('/syx/weihuaqiyijieshao/search/' + params.page + '/' + params.size, params)
    },
    addAPI: params => {
        if (!!params.id && params.id !== '' && params.id !== undefined) {
            return API.PUT('/syx/weihuaqiyijieshao/' + params.id, params)
        } else {
            return API.POST('/syx/weihuaqiyijieshao', params)
        }
    },
    delAPI: params => {
        return API.DELETE('/syx/weihuaqiyijieshao/delete', params)
    },
    findFormData: params => {
        params.page = !!params.page ? params.page : 1;
        params.size = !!params.size ? params.size : 10;
        return API.POST('/syx/weihuaqiyijieshao/search/' + params.page + '/' + params.size, params)
    },
}
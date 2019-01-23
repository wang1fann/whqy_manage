import * as API from '.'

export default {
    findList: params => {
        return API.POST('/syx/dangxingjiaoyu/search/' + params.page + '/' + params.size, params)
    },
    addAPI: params => {
        if (!!params.id && params.id !== '' && params.id !== undefined) {
            return API.PUT('/syx/dangxingjiaoyu/' + params.id, params)
        } else {
            return API.POST('/syx/dangxingjiaoyu', params)
        }
    },
    delAPI: params => {
        return API.DELETE('/syx/dangxingjiaoyu/delete', params)
    },
    findFormData: params => {
        params.page = !!params.page ? params.page : 1;
        params.size = !!params.size ? params.size : 10;
        return API.POST('/syx/dangxingjiaoyu/search/' + params.page + '/' + params.size, params)
    },
}
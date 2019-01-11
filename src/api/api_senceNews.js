import * as API from '.'

export default {
    findList: params => {
        return API.POST('/syx/jingquxinwen/search/' + params.page + '/' + params.size, params)
    },
    addAPI: params => {
        console.log(params);
        if (!!params.id) {
            return API.PUT(`/syx/jingquxinwen/` + params.id, params)
        } else {
            return API.POST(`/syx/jingquxinwen/`, params)
        }
    },
    //单个删除book
    delAPI: params => {
        return API.DELETE('/syx/jingquxinwen/delete', params);
    },
    findFormData: params => {
        params.page = !!params.page ? params.page : 1;
        params.size = !!params.size ? params.size : 10;
        return API.POST('/syx/jingquxinwen/search/' + params.page + '/' + params.size, params)
    }
}
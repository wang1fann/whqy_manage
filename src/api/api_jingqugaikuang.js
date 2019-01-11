import * as API from '.'

export default {
    findjingqugaikuangList: params => {
        return API.POST('/syx/jingqugaikuang/search/' + params.page + '/' + params.size, params)
    },
    addAPI: params => {
        console.log(params);
        if (!!params.id) {
            return API.PUT(`/syx/jingqugaikuang/` + params.id, params)
        } else {
            return API.POST(`/syx/jingqugaikuang/`, params)
        }
    },
    //单个删除book
    deljingqugaikuang: params => {
        return API.DELETE('/syx/jingqugaikuang/delete', params);
    },
    findFormData: params => {
        params.page = !!params.page ? params.page : 1;
        params.size = !!params.size ? params.size : 10;
        return API.POST('/syx/jingqugaikuang/search/' + params.page + '/' + params.size, params)
    }
}
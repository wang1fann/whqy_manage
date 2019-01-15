import * as API from '.'

export default {
    findhongselvyouList: params => {
        return API.POST('/syx/hongselvyou/search/' + params.page + '/' + params.size, params)
    },

    //查询获取一条book信息
    findById: id => {
        return API.GET(`/api/v1/books/${id}`)
    },

    addhongselvyou: params => {
        if (!!params.id) {
            return API.PUT(`/syx/hongselvyou/` + params.id, params)
        } else {
            return API.POST(`/syx/hongselvyou/`, params)
        }
    },
    //单个删除book
    delhongselvyou: params => {
        return API.DELETE('/syx/hongselvyou/delete', params);
    }
}
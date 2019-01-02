import * as API from '.'

export default {
    findDataRestoreList: params => {
        return API.POST('/syx/data/search/' + params.page + '/' + params.size, params)
    },

    //查询获取一条book信息
    findById: id => {
        return API.GET(`/api/v1/books/${id}`)
    },

    addLink: params => {
        console.log(params);
        if (!!params.id) {
            return API.PUT(`/syx/link/` + params.id, params)
        } else {
            return API.POST(`/syx/link/`, params)
        }
    },
    //单个删除book
    delLink: params => {
        return API.DELETE('/syx/link/deleteLink', params);
    }
}
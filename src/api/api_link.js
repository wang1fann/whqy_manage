import * as API from '.'

export default {
    findlinkList: params => {
        return API.POST('/syx/link/search/' + params.page + '/' + params.size, params)
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
        // if (!!params.id && params.id.indexOf(',') === -1) {
        // return API.DELETE('/syx/link/' + params.id, params); //后台现在已废弃单独删除接口，所有的删除操作统一使用多条删除接口，传数组
        // } else {}
        return API.DELETE('/syx/link/deleteLink', params);
    }
}
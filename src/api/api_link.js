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
        return API.POST(`/syx//link/`, params)
    },
    updateLink: (id, params) => {
        return API.PUT(`/api/v1/books/${id}`, params)
    },

    //单个删除book
    remove: id => {
        return API.DELETE(`/api/v1/books/${id}`)
    },

    //批量删除，传ids数组
    removeBatch: (ids) => {
        return API.DELETE(`/api/v1/books/batch/${ids}`)
    }

}
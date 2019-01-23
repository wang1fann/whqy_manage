import * as API from '.'

export default {
    findList: params => {
        return API.POST('/syx/lishiwenhuajiaoyu/search/' + params.page + '/' + params.size, params)
    },
    addAPI: params => {
        if (!!params.id && params.id !== '' && params.id !== undefined) {
            return API.PUT('/syx/lishiwenhuajiaoyu/' + params.id, params)
        } else {
            return API.POST('/syx/lishiwenhuajiaoyu', params)
        }
    },
    delAPI: params => {
        return API.DELETE('/syx/lishiwenhuajiaoyu/delete', params)
    }
}
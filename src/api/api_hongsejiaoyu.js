// http://192.168.0.110:9014/syx/hongsejiaoyu/search/1/10
import * as API from '.'

export default {
    findList: params => {
        return API.POST('/syx/hongsejiaoyu/search/' + params.page + '/' + params.size, params)
    },
    addAPI: params => {
        if (!params.id) {
            return API.POST('/syx/hongsejiaoyu', params)
        } else {
            return API.PUT('/syx/hongsejiaoyu/' + params.id, params)
        }
    },
    delAPI: params => {
        return API.DELETE('/syx/hongsejiaoyu/delete', params)
    }
}
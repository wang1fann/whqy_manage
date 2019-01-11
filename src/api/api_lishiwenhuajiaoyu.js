// http://192.168.0.110:9014/syx/lishiwenhuajiaoyu/search/1/10
import * as API from '.'

export default {
    findList: params => {
        return API.POST('/syx/lishiwenhuajiaoyu/search/' + params.page + '/' + params.size, params)
    },
    addAPI: params => {
        return API.POST('/syx/lishiwenhuajiaoyu', params)
    },
    delAPI: params => {
        return API.DELETE('/syx/lishiwenhuajiaoyu/delete', params)
    },
    // 修改
    // /syx/lishiwenhuajiaoyu/1077497926311350272
    updateAPI: params => {
        return API.POST('/syx/lishiwenhuajiaoyu/' + params.id, params)
    }
}
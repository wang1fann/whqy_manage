/**
 * banner相关api
 */
import * as API from './'

export default {
    // 页面banner相关
    findBannerList: params => {
        // /syx/menu/search根据parentId查询栏目
        return API.POST('/syx/banner/pageQuery', params)
    },
    addBanner: params => {
        // return API.POST(`/syx/Carouse/books`, params)
        if (params.get('id') != "" && params.get('id') != undefined) {
            return API.POST('/syx/banner/update', params);
        } else {
            return API.POST('/syx/banner/add', params);
        }
    },
    delBanner: params => { //删除
        return API.POST('/syx/banner/delete', params);
    },
}
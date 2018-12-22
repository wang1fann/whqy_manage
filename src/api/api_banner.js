/**
 * banner相关api
 */
import * as API from './'

export default {
    // 首页轮播图相关
    findCarouselList: params => { //page size
        // return API.POST('/blstation-web/itemcat/list', params)
        return API.POST('/blstation-web/carouse/pageQuery', params)
    },
    addCarousel: params => { //formdata类型
        if (params.get('id') != "" && params.get('id') != undefined) {
            return API.POST('/blstation-web/carouse/update', params);
        } else {
            return API.POST('/blstation-web/carouse/add', params);
        }
    },
    delCarousel: params => { //删除
        return API.POST('/blstation-web/carouse/delete', params);
    },
    // 页面banner相关
    findBannerList: params => {
        return API.POST('/blstation-web/banner/pageQuery', params)
    },
    addBanner: params => {
        // return API.POST(`/blstation-web/Carouse/books`, params)
        if (params.get('id') != "" && params.get('id') != undefined) {
            return API.POST('/blstation-web/banner/update', params);
        } else {
            return API.POST('/blstation-web/banner/add', params);
        }
    },
    delBanner: params => { //删除
        return API.POST('/blstation-web/banner/delete', params);
    },
}
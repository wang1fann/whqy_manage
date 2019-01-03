// /case/pageQuery
// 产品相关api

import * as API from '.'

export default {
    getDeviceBzt: params => {
        return API.POST('/syx/other/deviceBzt', params); //访问路径饼状图
    },
    getDeviceZzt: params => {
        return API.POST('/syx/other/deviceZzt', params); //访问量柱状图
    },
    getModuleZzt: params => {
        return API.POST('/syx/other/moduleZzt', params); //模块柱状图
    },
    // /syx/other/todayVisit
    getTodayVisit: params => {
        return API.GET('/syx/other/todayVisit', params); //今日访客总数
    },
    // /syx/other/allVisit
    getAllVisit: params => {
        return API.GET('/syx/other/allVisit', params); //获取访客总数
    }
}
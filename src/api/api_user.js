//用户相关api

import * as API from './'

export default {
    // 登录
    login: params => {
        return API.POST('/blstation-web/user/login', params)
    },
    getUser: params => {
        return API.GET('/blstation-web/user/1', params)
    },
    // 退出
    logout: params => {
        return API.GET('/carcloud/logout', params)
    },
    // 修改个人信息
    changeProfile: params => {
        return API.PATCH('/api/v1/users/profile', params)
    },
    // 查询获取user列表（通过page进行分页）
    findUserList: params => {
        return API.GET('/blstation-web/user/findAll', params)
    },
    // 查询获取CAR列表（通过page进行分页）
    findCarList: params => {
        return API.GET('/blstation-web/', params)
    },
    // 添加用户
    addUser: params => {
        return API.POST('/blstation-web/user/add', params)
    },
    // 删除用户
    delUser: params => {
        return API.POST('/blstation-web/user/delete/' + params.get('id'), '')
    },
}
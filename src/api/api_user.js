//用户相关api

import * as API from './'

export default {
    // 登录
    login: params => {
        return API.POST('/syx/user/login', params)
    },
    getUserById: params => {
        return API.GET('/syx/user/1', params)
    },
    // 退出
    logout: params => {
        return API.GET('/carcloud/logout', params)
    },
    // 上传用户头像
    uploadUserImg: params => {
        return API.POST('/syx/file/multipleUpload', params)
    },
    // 修改个人信息
    updateUserInfo: params => {
        // syx/user/id
        return API.PUT('/syx/user/' + params.id, params)
    },
    //  修改密码
    changePass: params => {
        // password原密码，phone手机号，repassword新密码
        return API.POST('syx/user/repassword', params)
    },
    // 查询获取user列表（通过page进行分页）
    findUserList: params => {
        return API.POST('/syx/user/search/' + params.page + '/' + params.size, params)
    },
    // 添加用户
    addUser: params => {
        return API.POST('/syx/user', params)
    },
    // 导出用户/syx/user/downloadexcel
    exportUser: params => {
        return API.POST('/syx/user/downloadexcel', params)
    },
    // 修改用户信息
    updateUserById: params => {
        return API.POST('/syx/user/update', params)
    },
    // 删除用户
    delUser: params => {
        // if (!!params.id && params.id.indexOf(',') === -1) {
        //     return API.DELETE('/syx/user/' + params.id, params)
        // } else {
        // }
        return API.DELETE('/syx/user/deleteUser', params)
    },
    // 生成随机吗
    getRandomCode: params => {
        return API.POST('/syx/user/randomCode', params)
    }
}
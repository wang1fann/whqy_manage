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
    // 192.168.0.110:9104/syx/file/multipleUpload
    uploadUserImg: params => {
        return API.POST('/syx/file/multipleUpload', params)
    },
    // 修改个人信息
    changeProfile: params => {
        return API.PATCH('/api/v1/users/profile', params)
    },
    //  修改密码
    changePass: params => {
        // password原密码，phone手机号，repassword新密码
        return API.POST('syx/user/repassword', params)
    },
    // 查询获取user列表（通过page进行分页）
    findUserList: params => {
        console.log(params);
        // user/search/1/5
        return API.POST('/syx/user/search/' + params.page + '/' + params.size, params)
    },
    // 添加用户
    addUser: params => {
        return API.POST('/syx/user/add', params)
    },
    // 修改用户信息
    updateUserById: params => {
        return API.POST('/syx/user/update', params)
    },
    // 删除用户
    delUser: params => {
        if (!!params.ids) {
            return API.POST('/syx/user/delete/' + params.ids, params)
        }
    },
}
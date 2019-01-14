import * as API from '.'
export default {
    // 权限相关
    addAPI: params => {
        // /syx/user/addAdminUser
        // /syx/user/addAdminUser
        if (params.id != "" && params.id != 0 && params.id != undefined) { //json类型
            return API.POST('/syx/user/addAdminUser', params);
        } else {
            return API.POST('/syx/user/addAdminUser', params);
        }
    },
    findPermissionList: params => { //查询所有操作权限菜单
        return API.POST('/syx/user/permission/' + params.permissionId, params)
    },
    findPermissionAll: params => { //分页查询后台权限和角色
        return API.POST('/syx/user/permission/alluser', params)
    },
    // 删除用户
    delUser: params => {
        return API.DELETE('/syx/user/deleteUser', params)
    },
    getDepartment: params => {
        return API.GET('/syx/department', params)
    },
    getUserType: params => {
        return API.POST('/syx/user/admin/roles', params)
    }
}
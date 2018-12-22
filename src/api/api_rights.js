import * as API from '.'
export default {
    // 公司相关接口
    addCompanyInfo: params => {
        return API.POST('/blstation-web/information/add', params);
    },
    getCompanyInfo: params => {
        return API.GET('/blstation-web/information/findAll', params);
    },
    delCompanyInfo: params => {
        // return API.POST('/blstation-web/information/DELETE', params);
    },
    updateCompanyInfo: params => {
        return API.POST('/blstation-web/information/findOne/' + params, '');
    },
    // 公司荣誉相关接口
    addHonor: params => {
        console.log(params.get('id'))
        if (params.get('id') != "" && params.get('id') != undefined) {
            return API.POST('/blstation-web/honor/update', params);
        } else {
            return API.POST('/blstation-web/honor/add', params);
        }
    },
    findAllHonor: params => {
        return API.GET('/blstation-web/honor/findAll', params)
    },
    findRightsList: params => {
        return API.GET('/blstation-web/honor/pageQuery', params)
    },
    delHonor: params => {
        return API.POST('/blstation-web/honor/delete', params)
    },
    // 公司职位相关接口
    addJob: params => {
        if (params.id != "" && params.id != 0 && params.id != undefined) { //json类型
            return API.POST('/blstation-web/job/update', params);
        } else {
            return API.POST('/blstation-web/job/add', params);
        }
    },
    findAllJob: params => { //前端
        return API.GET('/blstation-web/job/findAll', params)
    },
    findJobList: params => { //后端
        return API.GET('/blstation-web/job/pageQuery', params)
    },
    delJob: params => { //删除职位
        return API.POST('/blstation-web/job/delete', params)
    },
    jobDetail: params => {
        return API.POST('/blstation-web/job/findById', params);
    },
}
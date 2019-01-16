import * as API from '.'

export default {
    // 试题库 增删改查
    findTestLibraryList: params => {
        return API.GET('/syx/testLibrary', params)
    },
    findTestLibraryByPage: params => {
        return API.POST('/syx/testLibrary/search/' + params.page + "/" + params.size, params)
    },
    // 添加试题库/syx/test
    addTestLibrary: params => {
        if (!!params.id) {
            return API.PUT(`/syx/testLibrary/` + params.id, params)
        } else {
            return API.POST(`/syx/testLibrary`, params)
        }
    },
    //删除试题库
    delTestLibrary: params => {
        return API.DELETE('/syx/testLibrary/delete', params);
    },
    // 试题 增删改查
    findTest: params => {
        return API.POST('/syx/test/search/' + params.page + '/' + params.size, params)
    },
    // 添加试题/syx/test
    addTest: params => {
        if (!!params.id) {
            return API.PUT(`/syx/test` + params.id, params)
        } else {
            return API.POST(`/syx/test`, params)
        }
    },
    //删除试题
    delTest: params => {
        // /syx/test/delete
        return API.DELETE('/syx/test/delete', params);
    }
}
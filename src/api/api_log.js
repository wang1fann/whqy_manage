// /news/delete// /syx/leavemessage/all   获取留言信息
import * as API from './'

export default {
    findlogList: params => { //日志列表
        // log/search/1/5
        return API.POST('/syx/log/search/' + params.page + "/" + params.size, params);
    },
    delLog: params => { //删除
        return API.DELETE('/syx/log/delete', params);
    }

}
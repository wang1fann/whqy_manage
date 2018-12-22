// /blstation-web/leavemessage/all   获取留言信息
import * as API from './'

export default {
    messageList: params => { //categoryList
        return API.POST('/blstation-web/leavemessage/findAll', params); //获取留言列表
    },

    delMessage: params => { //删除留言
        return API.POST('/blstation-web/leavemessage/delete', params);
    },
    messageDetail: params => { //获取某条留言的详细信息
        return API.POST('/blstation-web/leavemessage/findById/' + params + '', '')
    }
}
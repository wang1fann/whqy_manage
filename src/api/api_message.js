// /blstation-web/leavemessage/all   获取留言信息
import * as API from './'

export default {
    findSingInList: params => { //categoryList
        return API.POST('/syx/signInInfo/findusersignlist', params); //获取留言列表
    },
    findMessageList: params => { //categoryList
        return API.POST('/syx/liuyanbiao/queryliuyan', params); //获取留言列表
    },
    // /syx/liuyanbiao/queryliuyan
    messageDetail: params => { //获取某条留言的详细信息
        return API.POST('/blstation-web/leavemessage/findById/' + params + '', '')
    },
    // /syx/liuyanbiao/getliuyantotal 留言表总数
    getMessageTotal: params => { //categoryList
        return API.POST('/syx/liuyanbiao/getliuyantotal', params); //获取留言列表
    },
    // /syx/signInInfo/queryusersigntotal  
    getSingInTotal: params => { //categoryList
        return API.POST('/syx/signInInfo/queryusersigntotal', params); //获取留言列表
    }
}
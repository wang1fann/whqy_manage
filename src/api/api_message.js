// /blstation-web/leavemessage/all   获取留言信息
import * as API from './'

export default {
    findSingInList: params => {
        return API.POST('/syx/signInInfo/findusersignlist', params); //获取留言列表
    },
    findMessageList: params => {
        return API.POST('/syx/liuyanbiao/queryliuyan', params); //获取留言列表
    },
    // 留言回复列表 
    findMessageReply: params => {
        return API.POST('/syx/liuyanbiao/queryliuyanreply', params); //获取留言列表
    },
    // /syx/liuyanbiao/queryliuyan
    // /syx/liuyanbiao/getliuyantotal 留言表总数
    getMessageTotal: params => {
        return API.POST('/syx/liuyanbiao/getliuyantotal', params); //获取留言列表
    },
    // /syx/signInInfo/queryusersigntotal  
    getSingInTotal: params => {
        return API.POST('/syx/signInInfo/queryusersigntotal', params); //获取留言列表
    },
    getReplyTotal: params => {
        return API.POST('/syx/liuyanbiao/queryliuyanreplytotal', params); //获取留言列表
    }
}
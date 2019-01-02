// /news/delete// /syx/leavemessage/all   获取留言信息
import * as API from './'

export default {
    findlogList: params => { //日志列表
        // log/search/1/5
        return API.POST('/syx/log/search/' + params.page + "/" + params.size, params);
    },
    newsListpageQuery: params => { //新闻列表
        return API.GET('/syx/news/pageQuery', params);
    },
    delNews: params => { //删除
        return API.POST('/syx/news/delete', params);
    },
    messageDetail: params => { //新闻详细信息
        return API.POST('/syx/news/findOne/' + params + '', '')
    },
    addNews: params => {
        console.log(params.get('id'))
        if (params.get('id') != "" && params.get('id') != undefined) {
            return API.POST('/syx/news/update', params);
        } else {
            return API.POST('/syx/news/add', params);
        }
    }
}
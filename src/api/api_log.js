// /news/delete// /blstation-web/leavemessage/all   获取留言信息
import * as API from './'

export default {
    findlogList: params => { //新闻列表
        return API.POST('/blstation-web/news/findAll', params);
    },
    newsListpageQuery: params => { //新闻列表
        return API.GET('/blstation-web/news/pageQuery', params);
    },
    delNews: params => { //删除
        return API.POST('/blstation-web/news/delete', params);
    },
    messageDetail: params => { //新闻详细信息
        return API.POST('/blstation-web/news/findOne/' + params + '', '')
    },
    addNews: params => {
        console.log(params.get('id'))
        if (params.get('id') != "" && params.get('id') != undefined) {
            return API.POST('/blstation-web/news/update', params);
        } else {
            return API.POST('/blstation-web/news/add', params);
        }
    }
}
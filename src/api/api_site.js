// /news/delete// /syx/leavemessage/all   获取留言信息
import * as API from './'

export default {
    findSiteList: params => { //查询站点列表
        return API.GET('/syx/site', params);
    },
    findMenuList: params => { //查询站点列表
        return API.GET('/syx/menu', params);
    },
    newsListpageQuery: params => { //新闻列表
        return API.GET('/syx/news/pageQuery', params);
    },
    delMenu: params => { //删除菜单
        return API.DELETE('/syx/menu/delete', params);
    },
    addSite: params => { //添加或修改站点
        if (!!params.id && params.id != "" && params.id != undefined) {
            return API.POST('/syx/menu/' + params.id, params);
        } else {
            return API.POST('/syx/menu', params);
        }
    }
}
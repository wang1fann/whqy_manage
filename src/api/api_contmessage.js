import * as API from './'

export default {
// 内容管理相关接口
  /*addCase: params => { //添加产品
    if (params.get('id') != "" && params.get('id') != undefined) {
      return API.POST('/blstation-web/case/update', params); //产品更新
    } else {
      return API.POST('/blstation-web/case/add', params); //产品添加
    }
  },*/
  Casejin: params => {
    return API.POST('/syx/jingqugaikuang', params); //获取景区列表
  },


}

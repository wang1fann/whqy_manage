import router from './router'
import Vue from 'vue';
import ElementUI from 'element-ui'; //ui库
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import 'font-awesome/css/font-awesome.min.css'; //字体图标库
import store from './store/index.js';
import axios from 'axios';
import ElSearchTablePagination from 'el-search-table-pagination'; //基于element封装的form、table轮子

import Egrid from 'egrid'
import 'jquery'
import '@/assets/css/common.scss'

import _ from 'lodash'
import '@/components/_global.js'

import VueAwesomeSwiper from 'vue-awesome-swiper'


// 引入UE所需
import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/jquery-2.2.3.min.js'


// 引入viewer实现图片点击放大、旋转、全屏展示、切换功能
// import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'
// Vue.use(Viewer);
// Viewer.setDefaults({
//     Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
// });

// import MenuUtils from '@/utils/MenuUtils' //动态菜单
require("babel-polyfill");
require('swiper/dist/css/swiper.css');
Vue.use(VueAwesomeSwiper)

Vue.use(ElementUI);
Vue.use(Egrid);

Vue.config.productionTip = false; //关闭生产环境下 语法检测

// axios并不能使用Vue.use() 来进行注册， 因此为方便使用可以在引用之后加入以下代码，axios，是基于Promise 的 HTTP 请求客户端,可同时在浏览器和 node.js 中使用。
Vue.use(ElSearchTablePagination, {
    axios
});
Vue.prototype.$axios = axios;
Vue.prototype._ = _;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
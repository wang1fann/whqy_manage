/**
 * Created by jerry on 2017/6/9.
 */
import axios from 'axios'
import { bus } from '../bus.js'
import { getCookie } from './util' //引用刚才我们创建的util.js文件，并使用getCookie方法


axios.defaults.withCredentials = false;
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头application/x-www-form-urlencoded;

axios.defaults.timeout = 100000; //设置请求过期时间
// axios.defaults.baseURL = 'http://47.98.182.165';
axios.defaults.baseURL = 'http://192.168.0.107:9014';

// http request 拦截器，通过这个，我们就可以把Cookie传到后台
// 请求拦截器
axios.interceptors.request.use(
    config => {
        const responseType = sessionStorage.getItem('responseType');
        // console.log('responseType=' + responseType);
        if (responseType == 'form') {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded' //设置跨域头部
            };
            // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //配置请求头application/x-www-form-urlencoded;
        } else if (responseType == 'file') {
            config.headers = {
                'Content-Type': 'multipart/form-data' //设置跨域头部
            };
        } else {
            config.headers = {
                'Content-Type': 'application/json' //设置跨域头部
            };
            // axios.defaults.headers.post['Content-Type'] = 'application/json'; //配置请求头
        }
        // console.log(config);
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// 相应拦截器
// http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         //response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
//         if (response.data.errCode == 2) {
//             router.push({
//                 path: '/login',
//                 query: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
//             })
//         }
//         return response;
//     },
//     error => {
//         return Promise.reject(error.response.data)
//     });

//添加一个请求拦截器
// axios.interceptors.request.use(function(config) {
//     console.dir(config);
//     return config;
// }, function(error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// 添加一个响应拦截器
// axios.interceptors.response.use(function(response) {
//     if (response.data && response.data.errcode) {
//         if (parseInt(response.data.errcode) === 40001) {
//             //未登录
//             bus.$emit('goto', '/login')
//         }
//     }
//     return response;
// }, function(error) {
//     // Do something with response error
//     return Promise.reject(error);
// });

//基地址
let base = ''; //接口代理地址参见：config/index.js中的proxyTable配置

//通用方法
export const POST = (url, params) => {
    return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
    return axios.get(`${base}${url}`, { params: params }).then(res => res.data)
}

export const PUT = (url, params) => {
    return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
    return axios.delete(`${base}${url}`, { params: params }).then(res => res.data)
}

export const PATCH = (url, params) => {
    return axios.patch(`${base}${url}`, params).then(res => res.data)
}
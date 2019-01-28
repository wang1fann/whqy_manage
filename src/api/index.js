/**
 * Created 2018.12.11
 */
import axios from 'axios'
import {
    Loading,
    Message
} from 'element-ui'
import {
    bus
} from '../bus.js'
import {
    getCookie
} from '@/plugins/util' //引用刚才我们创建的util.js文件，并使用getCookie方法


axios.defaults.withCredentials = false;
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;//window.sessionStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('token') || ''; //window.sessionStorage.getItem('token')


// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头application/x-www-form-urlencoded;

axios.defaults.timeout = 100000; //设置请求过期时间
axios.defaults.baseURL = 'http://192.168.0.107:9014';
// axios.defaults.baseURL = 'http://47.105.196.90:9014';

// axios.defaults.baseURL = 'http://192.168.0.105:9014'; //lili
// axios.defaults.baseURL = 'http://192.168.0.101:9014'; //zhenyang
// axios.defaults.baseURL = 'http://192.168.0.119:9014'; //lihao 
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
// 请求拦截器
// var loadinginstace;
axios.interceptors.request.use(
    config => {
        const responseType = sessionStorage.getItem('responseType');
        if (responseType == 'form') {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded', //设置跨域头部
                'token': window.token
            };
        } else if (responseType == 'file') {
            config.headers = {
                'Content-Type': 'multipart/form-data' //设置跨域头部
            };
        } else if (responseType == 'excel') {
            config.headers = {
                'Content-Type': 'application/vnd.ms-excel', //设置跨域头部
                'token': window.token
            };
        } else {
            config.headers = {
                'Content-Type': 'application/json', //设置跨域头部
                'token': window.token
            };
        }
        // console.log(config);
        // loadinginstace = Loading.service({
        //     fullscreen: true,
        //     text: "正在拼命加载中...",
        //     target: document.querySelector('.content-container') || body
        // })
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
    // loadinginstace.close()
    return data
}, error => {
    // loadinginstace.close()
    Message.error({
        message: '加载失败'
    })
    return Promise.reject(error)
});


//基地址
let base = ''; //接口代理地址参见：config/index.js中的proxyTable配置

//通用方法
export const POST = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(`${base}${url}`, params).then(res => {
            resolve(res.data);
        }, err => {
            reject(err)
        })
    })

}

export const GET = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${base}${url}`, {
                params: params
            }).then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const PUT = (url, params) => {
    return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
    return axios.delete(`${base}${url}`, {
        params: params
    }).then(res => res.data)
}

export const PATCH = (url, params) => {
    return axios.patch(`${base}${url}`, params).then(res => res.data)
}
import axios from 'axios'
import {Message, Loading} from 'element-ui'

// 创建axios实例
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://192.168.0.107:9014/syx';   //配置接口地址

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // let token = window.localStorage.getItem('token')
    // config.headers = {
    //   authorization: token,
    // }
    console.log(config);
    return config;
  },
  error => {
    console.log('err' + error)
    Message({
      showClose: true,
      message: '网络异常',
      type: 'error',
      duration: 5 * 1000
    })
    const loadingInstance = Loading.service({ lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' })
    loadingInstance.close()
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)
    return response;
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

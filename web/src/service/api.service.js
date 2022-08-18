// 用来封装不同类型请求的公共方法
import axios from 'axios'
import { Message } from 'element-ui';
import {getToken,getUsername} from '../utils/cookies'
import {getTokenCars} from "../utils/cookiesCars"

const service = axios.create({
    baseURL: process.env.VUE_APP_API ,
    timeout: 5000
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['Token'] = getToken();  // 携带token
    config.headers['Tokencars']=getTokenCars();
    config.headers['Username'] = getUsername();  // 携带token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error).catch((e) => { });
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {

    /**
     * http请求协议状态，不为200时，是失败。为200是成功
     * 
     * 重点知识：
     * 1、约定的属性：resCode，errorCode，code，apiCode
     * 2、resCode的什么值代表成功，业务逻辑有问题的情况，代表失败，否则就成功：0
     */
    const data = response.data;
    if (data.resCode === 0) {
        return Promise.resolve(data);
    } else {
        alert(data.message);
        const p=Promise.reject(data);
        console.log(p);
        return p;
        
    }

}, function (error) {
    // const data = JSON.parse(error.request.response);
    // alert(data.msg);
    // 对响应错误做点什么
    console.log(error)
    return Promise.reject(error);
});

export default service;
import service from "@/service/api.service";
/** 获取验证码 */
export function Send(data){
    return service.request({
    url:process.env.VUE_APP_DEV_TARGET +'/getSms/',
    method: 'post',
    data,
});
}

/** 用户注册 */
export function Register(data){
    return service.request({
        url:process.env.VUE_APP_DEV_TARGET +'/register/',
        method: 'post',
        data,
    })
}


/** 用户登录 */
export function Login(data){
    console.log(process.env.VUE_APP_APIURL)
    return service.request({
        url:process.env.VUE_APP_DEV_TARGET +'/login/',
        method: 'post',
        data,
    })
}



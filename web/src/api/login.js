import service from "@/service/api.service";

/** 获取验证码 */
export function GetCode(data){
    return service.request({
    url:process.env.VUE_APP_DEV_TARGET_WEB +'/account/code/',
    method: 'post',
    data,
});
}
/**
 * 注册
 */
 export function Register(data){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +'/account/register/',
        data
    })
}

/**
 * 登录
 */
export function Login(data){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +'/account/login/',
        data
    })
}


/**
 * 忘记密码
 */
export function Forget(data){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +'/account/forget/',
        data
    })
}

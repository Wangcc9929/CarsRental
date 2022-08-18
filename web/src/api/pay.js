import service from "@/service/api.service"

/**
 * 获取充值列表
 */
 export function AmountList(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +"/amount/",
        data
    })
}

/**
 * 充值
 */
export function Pay(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +"/pay/",
        data
    })
}
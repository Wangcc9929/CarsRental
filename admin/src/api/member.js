import service from "@/service/api.service";

/** 会员详情 */
export function Detailed(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+ "/member/detailed/",
        data
    })
}

/** 会员修改 */
export function Edit(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+ "/member/edit/",
        data
    })
}

/** 更新实名认证 */
export function UpdateRealName(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+ "/member/updateRealName/",
        data
    })
}

/** 黑名单 */
export function Blacklist(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+ "/member/blacklist/",
        data
    })
}

/** 认证图片 */
export function Photo(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+ "/member/photo/",
        data
    })
}

/** 清除金额 */
export function AmountClear(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+ "/member/amountClear/",
        data
    })
}
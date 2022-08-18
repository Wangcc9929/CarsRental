import service from "@/service/api.service"
/**
 * 支付查询订单状态
 */
 export function OrderStatus(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +"/orderStatus/",
        data
    })
}

/** 租车订单 */
export function OrderList(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +"/orderList/",
        data
    })
}

/** 查找正在使用的车辆 */
export function GetCarsActivation(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +"/carsActivation/",
        data
    })
}

/** 取车 */
export function CarsGet(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +"/carsGet/",
        data
    })
}

/** 还车 */
export function CarsReturn(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +"/carsReturn/",
        data
    })
}

/** 还车 */
export function CarsReturns(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +"/carsReturnS/",
        data
    })
}

/** 取消 */
export function CarsCancel(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +"/carsCancel/",
        data
    })
}
// 订单详情
export function OrderDetailed(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB +"/orderDetailed/",
        data
    })
}
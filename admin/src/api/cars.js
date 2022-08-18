import service from "@/service/api.service";
/** 添加 */
export function CarsAdd(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/cars/carsInfoAdd/",
        data
    })
}
/** 禁启用状态 */
export function CarsStatus(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/cars/status/",
        data
    })
}

/** 删除 */
export function CarsDelete(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/cars/delete/",
        data
    })
}

/** 详情 */
export function CarsDetailed(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/cars/carsDetailed/",
        data
    })
}

/** 编辑 */
export function CarsEdit(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/cars/carsInfoEdit/",
        data
    })
}

/** 释放车辆 */
export function CarsLock(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/cars/lock/",
        data
    })
}
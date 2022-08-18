import service from "@/service/api.service";

export function LeaseAdd(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/lease/add/",
        data
    })
}
export function LeaseStatus(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/lease/status/",
        data
    })
}
export function LeaseEdit(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/lease/edit/",
        data
    })
}

export function LeaseList(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/lease/carsLeaseList/",
        data
    })
}
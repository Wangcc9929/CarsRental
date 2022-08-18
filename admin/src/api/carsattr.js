import service from "@/service/api.service";

export function GetCarsTypeBasis(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/carsAttr/type/",
        data
    })
}
export function GetCarsTypeList(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/carsAttr/list/",
        data
    })
}
export function CarsTypeAdd(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/carsAttr/add/",
        data
    })
}
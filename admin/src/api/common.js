import service from "@/service/api.service";
//获取城市
export function GetCity(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/cityPicker/",
        data
    })
}
// 获取table数据
export function GetTableData(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+data.url,
        data:data.data,
    })
}
//获取车辆品牌
export function GetCarBrand(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/common/getCarsBrand/",
        data
    })
}
//获取停车场
export function GetParking(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/common/getParking/",
        data
    })
}
//获取七牛云token
export function GetQiniuToken(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/uploadImgToken/",
        data
    })
}
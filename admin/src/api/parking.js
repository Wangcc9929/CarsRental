import service from "@/service/api.service"
/** 新增停车场 */
export function ParkingAdd(data = {}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET +"/parking/add/",
        data
    })
}
// 停车场列表
export function ParkingList(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET +"/parking/list/ ",
        data
    })
}
// id查询停车场
export function ParkingDetailed(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET +"/parking/detailed/ ",
        data
    })
}
//编辑停车场
export function ParkingEdit(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET +"/parking/edit/",
        data
    })
}
//删除停车场
export function ParkingDelect(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET +"/parking/delete/",
        data
    })
}
//修改停车场状态
export function ParkingStatus(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET +"/parking/status/",
        data
    })
}
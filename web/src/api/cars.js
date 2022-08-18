import service from "@/service/api.service";

//获取停车场中车辆
export function GetCarsList(data={}){
    return service.request({
        url:process.env.VUE_APP_DEV_TARGET_WEB +'/cars/',
        method: 'post',
        data,
    });
}
// 获取每台车租赁价格
export function GetCarsLease(data={}){
    return service.request({
        url:process.env.VUE_APP_DEV_TARGET_WEB +'/lease/',
        method: 'post',
        data,
    });
}
/**
 * 预约车辆
 */
 export function ReserveCars(data = {}){
    return service.request({
        method: "post",
        url:process.env.VUE_APP_DEV_TARGET_WEB+"/confirmCars/",
        data
    })
}

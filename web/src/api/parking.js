import service from "@/service/api.service";

//获取停车场
export function GetParking(data={}){
    return service.request({
        url:process.env.VUE_APP_DEV_TARGET_WEB +'/parking/',
        method: 'post',
        data,
    });
}
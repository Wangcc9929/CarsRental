import service from "@/service/api.service"

//获取七牛云token
export function GetQiniuToken(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/uploadImgToken/",
        data
    })
}
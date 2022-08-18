import service from "@/service/api.service";
//获取品牌logo
export function BrandLogo(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/brand/logo/",
        data
    })
}
//新增品牌
export function BrandAdd(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/brand/add/",
        data
    })
}
// 修改品牌状态
export function BrandStatus(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/brand/status/",
        data
    })
}
//删除品牌
export function BrandDelect(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/brand/delete/",
        data
    })
}
//品牌详情
export function BrandDetailed(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET+"/brand/detailed/",
        data
    })
}
// 品牌编辑
export function BrandEdit(data={}){
    return service.request({
        method: "post",
        url: process.env.VUE_APP_DEV_TARGET +"/brand/edit/",
        data
    })
}
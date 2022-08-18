import service from "@/service/api.service";
//获取菜单列表
export function getMenuList(data){
    return service.request({
        url: 'http://old.web-jshtml.cn/api/cars/parking/list/ ',
        method: 'post',
        data,
    })
}
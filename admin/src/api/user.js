import service from "@/service/api.service";
// 用户新增
export function UserCreate(data){
    return service.request({
        // url: '/v1/account/check',
        url: process.env.VUE_APP_USER_APIURL + '/v1/user/create',
        method: 'post',
        data,
    })
}

//用户列表
export function UserList(data){
    return service.request({
        // url: '/v1/account/check',
        url: process.env.VUE_APP_USER_APIURL + '/v1/user/lists',
        method: 'post',
        data,
    })
}

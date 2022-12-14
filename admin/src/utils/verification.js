/**
 * 手机号验证
 * 
 */
 export function checkPhone(value){
    let regPhong = /^1[3456789]\d{9}$/;
    return regPhong.test(value);
}
/**
 * 6-20数字+英文
 */
export function checkPassword(value){
    let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return regPassword.test(value);
}
/**
 * 数字
 */
export function checkCode(value){
    let regCode = /^[a-z0-9]{6}$/;
    return regCode.test(value);
}
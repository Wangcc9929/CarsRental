<template>
<el-form-item prop="username" :rules="[{ validator: validateUsername, trigger: 'blur' }]">
  <el-input
    v-model="username"
    :placeholder="placeholder"
    :onblur="returnValidate()"
  ></el-input>
</el-form-item>
</template>

<script>
import {checkPhone} from "../../utils/verification"
export default {
    name:"UserName",
    props:{
        placeholder:{
            type:String,
            default:"手机号",
        }
    },
    data() {
        return {
            username:"",
        }
    },
    methods: {
        validateUsername(rule, value, callback){
            if(!this.username || this.username == '') {
                return callback(new Error("手机号不能为空"))
            }else if(!checkPhone(this.username)){
                return callback(new Error("手机号格式不正确"));
            }else{
                callback()
            }
        },
        returnValidate(){
            const valiStatus=checkPhone(this.username);
            let value=valiStatus?this.username:"";
            this.$emit("update:username",value);
            console.log(value);
        },
    },
};
</script>

<style>
</style>
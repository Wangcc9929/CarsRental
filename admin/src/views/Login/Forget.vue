<template>
  <div class="Forget">
    <div class="formWrap user-safe">
      <el-form :model="formLabelAlign" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="formLabelAlign.name"
            placeholder="用户名/手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            v-model="formLabelAlign.password"
            type="password"
            placeholder="登录密码"
          ></el-input>
        </el-form-item>
                <el-form-item label="确认密码" prop="checkpassword">
          <el-input
            v-model="formLabelAlign.checkpassword"
            type="password"
            placeholder="确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <button type="button" class="button-vcode" @click="getCode" :disabled="codeItem.disabled">
            {{codeItem.name}}
          </button>
          <el-input
            v-model="formLabelAlign.code"
            placeholder="验证码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-black">注册</el-button>
        </el-form-item>
        <div class="fs12 txtali-c">
          <router-link to="/" class="color-white">登录</router-link>
          |
          <router-link to="/register" class="color-white">注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { checkPhone,checkPassword,checkCode} from '../../utils/verification'
export default {
name: "Register",
  data() {
    var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (!checkPhone(value)) {
            callback(new Error('请输入正确手机号'));
          } else {
              callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!checkPassword(value)){
            callback(new Error("请输入6~20位的，数字+英文"));
        }
        else {
          if (this.formLabelAlign.checkpassword !== '') {
            this.$refs.formLabelAlign.validateField('checkpassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formLabelAlign.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateCode=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入验证码'));
         } 
        else if(!checkCode(value)){
          callback(new Error('请输入6位验证码'));
        }
        else{
          callback();
        }
      }
    return {
      formLabelAlign: {
        name: "",
        password: "",
        checkpassword:"",
        code: "",
      },
      rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkpassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { validator: validatePhone, trigger: 'blur' }
          ],
          code:[
            { validator: validateCode,trigger:'blur'}
          ]
        },
        codeItem:{
        name:"获取验证码",
        disabled:false,
        loading:false,
        itimer:null,
        sec:60,
      }
      };
    },
  methods: {
    getCode() {
      if(this.formLabelAlign.name===''){
        alert("用户名不能为空");
        return false;
      }
      this.codeItem.itimer&&clearInterval(this.codeItem.itimer);
      this.codeItem.itimer=setInterval(()=>{
        this.codeItem.disabled=true;
        let s=this.codeItem.sec--;
        this.codeItem.name=`${s}秒`;
        if(s<=0){
          clearInterval(this.codeItem.itimer);
          this.codeItem.disabled=false;
          this.codeItem.name="重新获取";
        }
      },1000)
    },
    onSubmit() {
      console.log("submit!");
    },
  },
}
</script>

<style lang="scss">
.Forget{
 display: flex;
  width: 100vw;
  height: 100vh;
  background-color: $color-main;
  align-items: center;
  justify-content: center;
  color: white;
  .formWrap {
    width: 350px;
  }
}
</style>
<template>
  <el-form-item prop="checknum" :rules="rules">
    <button
      type="button"
      class="button-vcode"
      :disabled="disabled"
      @click="handlerCode"
    >
      {{ this.name }}
    </button>
    <el-input v-model="checknum" placeholder="验证码" :onblur="returnValidate()"></el-input> 
    </el-form-item>
</template>

<script>
import {GetCode} from "../../api/login"
export default {
  name: "Code",
  props: {
    username: {
      type: String,
      default: "",
    },
    second: {
      type: Number,
      default: 60,
    },
    getcodeType:{
      type:String,
      default:"register",
    }
  },
  data() {
    return {
      checknum: "",
      disabled: true,
      timer: null,
      name: "获取验证码",
      rules: [
        { required: true, message: "验证不能为空", trigger: "blur" },
        { min: 6, max: 6, message: "请输入6位字符的验证码", trigger: "blur" },
      ],
    };
  },
  methods: {
    handlerCode() {
      this.disabled = true; 
      this.countDown();
      GetCode({username:this.username,module:this.getcodeType}).then(response=>{
        this.$message({
          type:"success",
          message:response.message,
        });
        console.log(response.message);
      })
    },
    countDown() {
      let s = this.second;
      this.name = `${s}秒`;
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        --s;
        this.name = `${s}秒`;
        if (s <= 0) {
          clearInterval(this.timer);
          this.name = "重新获取";
          this.disabled = false;
        }
      }, 1000);
    },
    returnValidate(){
      this.$emit("update:value",this.checknum)
    }
  },
  watch: {
    username: {
      handler(newValue) {
        this.disabled = newValue ? false : true;
      },
    },
  },
};
</script>

<style>
</style>
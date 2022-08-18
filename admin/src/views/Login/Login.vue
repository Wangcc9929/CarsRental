<template>
  <div class="Login">
    <div class="formWrap user-safe">
      <el-form
        :model="formLabelAlign"
        status-icon
        :rules="rules"
        ref="formLabelAlign"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="formLabelAlign.name"
            placeholder="用户名/手机号"
            :disabled="input_disabled.username"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="登录密码"
          prop="password"
          :disabled="input_disabled.password"
        >
          <el-input
            v-model="formLabelAlign.password"
            type="password"
            placeholder="登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <button
            type="button"
            class="button-vcode"
            @click="getCode"
            :loading="codeItem.loading"
            :disabled="codeItem.disabled"
          >
            {{ codeItem.name }}
          </button>
          <el-input
            v-model="formLabelAlign.code"
            placeholder="验证码"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin: 0 30px">
          <Captcha />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('formLabelAlign')"
            class="button-black"
            >登录</el-button
          >
        </el-form-item>
        <div class="fs12 txtali-c">
          <router-link to="/forget" class="color-white">忘记密码</router-link>
          |
          <router-link to="/register" class="color-white">注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRef } from "vue";
import { checkPhone, checkPassword, checkCode } from "../../utils/verification";
import { Send, CheckUsername, Register, Login } from "../../api/account";
import Captcha from "../../components/Captcha/index.vue";
import md5 from "js-md5";
import { setToken, setUsername } from "../../utils/cookies";

export default {
  name: "Login",
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (!checkPhone(value)) {
          callback(new Error("请输入正确手机号"));
        } else {
          this.codeItem.disabled = false;
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!checkPassword(value)) {
        callback(new Error("请输入6~20位的，数字+英文"));
      } else {
        if (this.formLabelAlign.checkpassword !== "") {
          this.$refs.formLabelAlign.validateField("checkpassword");
        }
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!checkCode(value)) {
        callback(new Error("请输入6位验证码"));
      } else {
        callback();
      }
    };
    return {
      formLabelAlign: {
        name: "",
        password: "",
        code: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: validatePhone, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
      codeItem: {
        name: "获取验证码",
        disabled: true,
        loading: false,
        itimer: null,
        sec: 5,
      },
      input_disabled: {
        name: false,
        password: false,
      },
    };
  },
  components: {
    Captcha,
  },
  methods: {
    getCode() {
      if (this.formLabelAlign.name === "") {
        alert("用户名不能为空");
        return false;
      }
      // const
      // ChekcUsername({username:this.formLabelAlign.name}).then(response=>{
      //   console.log(response);
      // })
      //按钮加载
      this.codeItem.loading = true;
      this.codeItem.name = "加载中";
      Send({ username: this.formLabelAlign.name, type: "Login" }).then(
        (response) => {
          this.codeItem.loading = false;
          alert(response.message);
          this.count_code();
        }
      );
    },
    // 校验表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Login({
            username: this.formLabelAlign.name,
            password: md5(this.formLabelAlign.password),
            code: this.formLabelAlign.code,
          }).then(
            (response) => {
              console.log(response);
              setToken({ token: response.data.token });
              setUsername({ username: response.data.username });
              this.$router.push({
                name: "Index",
              });
            },
            (err) => {}
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //验证码计时器
    count_code() {
      this.codeItem.sec = 5;
      this.codeItem.itimer && clearInterval(this.codeItem.itimer);
      this.codeItem.itimer = setInterval(() => {
        this.codeItem.disabled = true;
        let s = this.codeItem.sec--;
        this.codeItem.name = `${s}秒`;
        if (s <= 0) {
          clearInterval(this.codeItem.itimer);
          this.codeItem.disabled = false;
          this.codeItem.name = "重新获取";
        }
      }, 1000);
    },
  },
  mounted() {
    console.log(process.env);
  },
};
</script>
<style scoped lang="scss">
.Login {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: $color-main;
  align-items: center;
  justify-content: center;
  color: white;
  .formWrap {
    width: 350px;
    .el-form-item__label {
      color: #fff;
    }
  }
}
</style>

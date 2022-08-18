<template>
  <el-form ref="checkpass" :model="form" :rules="rules">
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="密码"
        v-on:input="enterInput"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password_com">
      <el-input
        type="password"
        v-model="form.password_com"
        placeholder="确认密码"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { checkPassword } from "../../utils/verification";
export default {
  name: "Password",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: "密码",
    },
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!checkPassword(this.form.password)) {
        return callback(new Error("密码为6~20的英文和数字组合"));
      } else {
        if (this.form.password_com !== "") {
          this.$refs.checkpass.validateField('password_com');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        password: "",
        password_com: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        password_com: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    enterInput() {
      this.$emit("update:value", this.form.password);
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
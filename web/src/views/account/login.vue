<template>
  <div class="user-safe usermargin">
    <Back column="登录">
      <template v-slot:navHeaderRight>
        <router-link to="/register" class="color-white opacity-4"
          >注册</router-link
        >
      </template>
    </Back>
    <div style="margin: 20px"></div>
    <el-form ref="form" :model="form">
      <UserName :username.sync="form.username" />
      <PassWordVue :value.sync="form.password" />
      <Code
        :username="form.username"
        :seconde="code_second"
        :value.sync="form.checknum"
        getcodeType="login"
      />
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="button-black"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
    <div class="text-right">
      <router-link to="/forget" class="color-white opacity-4"
        >忘记密码</router-link
      >
    </div>
  </div>
</template>

<script>
import UserName from "../../components/account/username.vue";
import Code from "../../components/code/index.vue"
import PassWordVue from "../../components/account/password.vue";
import {Login} from "../../api/login";
import md5 from "js-md5";
import {setToken,setUsername} from "../../utils/cookiesCars"
export default {
  name: "Login",
  components: { UserName, PassWordVue ,Code},
  data() {
    return {
      code_second: 60,
      form: {
        username: "",
        password: "",
        checknum: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login() {
      const requestData = {
        username: this.form.username,
        password: md5(this.form.password),
        code: this.form.checknum,
      };
      Login(requestData).then((response) => {
        setToken(response.data.token);
        setUsername(response.data.username);
        this.$message({
          type: "success",
          message: response.message,
        });
        this.$router.push({
          name: "Index",
        });
      });
    },
  },
};
</script>

<style>
</style>
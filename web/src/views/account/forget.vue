<template>
  <div class="user-safe usermargin">
    <Back column="忘记密码">
      <template v-slot:navHeaderRight>
        <router-link to="/login" class="color-white opacity-4"
          >登录</router-link
        >
      </template>
    </Back>
    <div style="margin: 20px"></div>
    <el-form ref="form" :model="form">
      <UserName :username.sync="form.username" />
      <PassWordCom ref="password" :value.sync="form.password" />
      <Code
        :username="form.username"
        :seconde="code_second"
        :value.sync="form.checknum"
      />
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="button-black"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UserName from "../../components/account/username.vue";
import Code from "../../components/code/index.vue";
import PassWordCom from "../../components/account/password_comfirm.vue";
import {Forget} from "../../api/login"
import md5 from "js-md5";
export default {
  name: "Forget",
  components: { UserName, Code, PassWordCom },
  data() {
    return {
      form: {
        username: "",
        password: "",
        checknum: "",
      },
      code_second: 60,
      commform: false,
      passform: false,
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.commform = true;
        } else {
          console.log("error submit!!");
          // return false;
        }
      });
      this.$refs["password"].$refs.checkpass.validate((valid2) => {
        if (valid2) {
          this.passform=true;
        }
        else{
          console.log("error submit!!");
        }
      });
      if(this.commform&&this.passform){
        this.forget();
      }
    },
    forget(){
      let requestData={
        username:this.form.username,
        password:md5(this.form.password),
        code:this.form.checknum,
      }
      Forget(requestData).then(response=>{
        this.$message({
          type:"success",
          message:response.message,
        })
        this.$router.push({
          name:"Login"
        })
      });
    }
  },
};
</script>

<style>
</style>
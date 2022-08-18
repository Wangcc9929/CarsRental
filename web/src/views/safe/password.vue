<template>
  <div class="user-safe usermargin">
    <Back column="修改登录密码" />
    <div style="margin: 20px"></div>
    <el-form  :model="formLabelAlign">
      <el-form-item>
        <el-input
          v-model="formLabelAlign.oldpassword"
          placeholder="原始密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formLabelAlign.newpassword"
          placeholder="新密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formLabelAlign.newpassword_2"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <button type="button" class="button-vcode">获取验证码</button>
        <el-input
          v-model="formLabelAlign.checknum"
          placeholder="验证码"
        ></el-input>
      </el-form-item>
      <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="button-black">确定</el-button>
                </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Password",
  data() {
    return {
      formLabelAlign: {
        oldpassword: "",
        newpassword: "",
        newpassword_2: "",
        checknum: "",
      },
    };
  },
};
</script>

<style>
</style>
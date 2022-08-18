<template>
  <el-dialog title="新增用户" :visible.sync="mydialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" :label-width="formLabelWidth">
      <el-input v-model="form.realname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="身份证" :label-width="formLabelWidth">
      <el-input v-model="form.cardid" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="身份类型">
    <el-radio-group v-model="form.role">
      <el-radio label="超级管理员"></el-radio>
      <el-radio label="产品管理员"></el-radio>
      <el-radio label="会员管理员"></el-radio>
    </el-radio-group>
    </el-form-item>
    <el-form-item label="禁启用">
    <el-radio-group v-model="form.status">
      <el-radio label="启用"></el-radio>
      <el-radio label="禁用"></el-radio>
    </el-radio-group>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogfalse">取 消</el-button>
    <el-button type="primary" @click="createUser" :loading="subloading">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import {UserCreate} from "../../api/user"
import md5 from "js-md5"
import { Message } from 'element-ui';
export default {
  data() {
    return {
      form:{
        username:'',
        realname:'',
        phone:'',
        cardid:'',
        password:'',
        role:'',
        status:true,
      },
      subloading:false,
      formLabelWidth: '120px'
    };
  },
  //props传过来的父组件值不可以被直接修改，因此需要设置一个监听属性my...
  //set调用自定义事件来修改父组件中的值
  props:['dialogFormVisible'],
  computed:{
    mydialogFormVisible:{
        get(){return this.dialogFormVisible},
        set(value){
            this.$emit('changeVisable',value)
        }
    }
  },
  methods: {
    dialogfalse(){
        this.mydialogFormVisible=false;
    },
    createUser(){
      this.subloading=true;
      UserCreate({
        username:this.form.username,
        truename:this.form.realname,
        phone:this.form.phone,
        password:md5(this.form.password),
        role:this.form.role,
        status:this.form.status
      }).then(response=>{
        this.subloading=false;
        if(!response.data.content.user){
          Message.error(response.content.msg)
          return false;
        }
        this.mydialogFormVisible=false;
      },err=>{
        this.mydialogFormVisible=false;
      });
    }
  },
};
</script>

<style>
</style>
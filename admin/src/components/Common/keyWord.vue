<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-select v-model="search_key.label">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
    <el-col :span="16">
        <el-input placeholder="请输入关键字" v-model="search_key.value" v-on:input="inputEnter"></el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "KeyWord",
  props:{
    options:{
        type:Array,
        default:[],
    },
    
  },
  data() {
    return {
        search_key:{
            label:"",
            value:"",
        },
    }
  },
  methods: {
    inputEnter(){
        // let keyword=this.search_key;
        this.$emit("update:value",this.search_key);
    },
    clear(){
        this.search_key={
            label:"",
            value:"",
        };
    }
  },
};
</script>

<style>
</style>
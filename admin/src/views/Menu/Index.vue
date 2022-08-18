<template>
  <div>

  </div>
</template>

<script>
import {getMenuList} from '../../api/menu'
export default {
    name:'Menu',
    mounted(){
      getMenuList({pageSize:10,pageNumber:1}).then(response=>{
        console.log("success");
        console.log(response);
      },err=>{
        console.log("error");
        console.log(err);
      })
    }
}
</script>

<style>

</style>
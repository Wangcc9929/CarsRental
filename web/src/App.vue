<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  mounted() {
        document.addEventListener('mouseup',(e)=>{
          //获取用户子视图
            const userCon=document.querySelector(".users");
            // 获取车辆列表
            const carsSwiper=document.querySelector(".cars-wrap");
            if(carsSwiper){
                if(!carsSwiper.contains(e.target)){
                    this.$store.commit("app/SELF_CARS_LIST_STATUS",false);
                }
                let timer=setTimeout(()=>{
                  this.$store.commit("app/SELF_CARS_LIST_STATUS",true);
                  clearTimeout(timer);
                },100)
                
            }
            if(userCon){
                if(!userCon.contains(e.target)){
                    this.$router.push({
                        name:'Index',
                    })
                }
            }
        })
    },
}
</script>

<style>
#app {
}
</style>
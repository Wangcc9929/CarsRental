<template>
  <el-dialog :title="parking_data.parkingName" :visible.sync="dialogVisible" @opened="getMapMarker" @close="close">
    <div style="height:500px">
        <Map ref="amap"/>
    </div>
  </el-dialog>
</template>

<script>
import Map from "../../views/amap/index.vue";
export default {
  name: "parkingMap",
  components:{Map},
  data() {
    return {
    }
  },
  props: {
    mapdialog:{
        type:Boolean,
        default:false
    },
    parking_data:{
        type:Object,
        default:{},
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.mapdialog;
      },
      set(value) {
        this.$emit("changeVisiable", value);
      },
    },
  },
  methods: {
    getMapMarker(){
        this.$refs.amap.mapCreate();
        //调用DOM元素方法时，要确保DOM元素已被加载完成
        this.$nextTick(()=>{
            const splitLnglat=this.parking_data.lnglat.split(",");
            const lnglat={
                lng:splitLnglat[0],
                lat:splitLnglat[1],
            }
            this.$refs.amap.setMarker(lnglat);
        })
    },
    close(){
        this.$refs.amap.mapDestroy();
    }
  },
};
</script>

<style>
</style>
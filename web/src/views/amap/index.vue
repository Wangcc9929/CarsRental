<template>
  <div>
    <!-- <div class="search-box">
      <el-input
        v-model="searchKey"
        type="search"
        id="search"
        placeholder="请输入详细地址"
      ></el-input>
      <button @click="searchByHand">搜索</button>-->
    <!-- <div class="tip-box" id="searchTip"></div>
    </div> -->
    <!--
      amap-manager： 地图管理对象
      vid：地图容器节点的ID
      zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
      center： 地图中心点坐标值
      plugin：地图使用的插件
      events： 事件
    -->
    <div class="amap-box">
      <el-amap
        :amap-manager="amapManager"
        :events="events"
        :zoom="zoom"
        :vid="'vue-amap'"
        class="amap-demo"
      >
        <el-amap-circle
          v-for="item in circle"
          :key="item.id"
          :center="item.center"
          :radius="item.radius"
          :fillColor="item.color"
          :strokeColor="item.color"
          :strokeOpacity="item.strokeOpacity"
          :strokeWeight="item.strokeWeight"
        ></el-amap-circle>
        <el-amap-marker
          v-for="(item, index) in parking"
          :key="item.id"
          :content="item.content"
          :offset="item.offset"
          :position="item.position"
          :vid="index"
        ></el-amap-marker>
        <!--覆盖物 - 停车场 - 车辆-->
        <el-amap-marker
          v-for="(item, index) in parking"
          :extData="item"
          :events="item.events"
          :key="item.id + index"
          :content="item.text"
          :offset="item.offsetText"
          :position="item.position"
          :vid="index"
        ></el-amap-marker>
        <!--覆盖物 - 停车场 - 距离信息-->
        <el-amap-marker
          v-for="(item, index) in parkingInfo"
          zIndex="1000"
          :key="item.id"
          :content="item.text"
          :offset="item.offset"
          :position="item.position"
          :vid="index"
        ></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import { Selflocation } from "./location";
import { Walking } from "./warking";
import StyleCss from "./style"
let amapManager = new AMapManager();
export default {
  name: "Index",
  data() {
    const self = this;
    return {
      name: "Map",
      map: null,
      zoom: 14,
      self_lng: "",
      self_lat: "",
      amapManager,
      circle: [],
      parking:[],
      //停车场数据
      parkingData: {},
      // 停车场详细信息
      parkingInfo: [],
      events: {
        init(o) {
          lazyAMapApiLoaderInstance.load().then(() => {
            //地图初始化完成回调
            self.initMap();
          });
        },
      },
    };
  },
  methods: {
    initMap() {
      this.map = amapManager.getMap();
      this.$emit("loadmap");
      this.selfLocation();
    },
    /**
     * 自身定位
     */
    selfLocation() {
      Selflocation({
        map: this.map,
        complete: (val) => this.selfLocationComplete(val),
      });
    },
    //存储点击的停车场数据
    saveData(params) {
      if (this[params.key]) {
        this[params.key] = params.value;
      }
    },
    /** 自身定位 成功回调 */
    selfLocationComplete(data) {
      this.self_lng = data.position.lng;
      this.self_lat = data.position.lat;
      const json = {
        radius: 4,
        color: "#393e43",
        strokeOpacity: "0.2",
        strokeWeight: "30",
      };
      json.center = [this.self_lng, this.self_lat];
      this.circle.push(json);
    },
    saveparkingData(data) {
      this.parking = data;
    },
    //步行路线规划
    walking(lnglat) {
      // 步行路线规划
      Walking({
        map: this.map,
        position_start: [this.self_lng, this.self_lat],
        position_end: lnglat,
        complete: (val) => this.walkingComlete(val),
      });
    },
    walkingComlete(data) {
      this.parkingInfo = [
        {
          position: this.parkingData.lnglat.split(","),
          text: `<div style='${StyleCss.parkingInfoWrap}'>
                        <span style="${StyleCss.parkingInfoNumber}">${this.parkingData.carsNumber}</span>
                        辆车<span style="${StyleCss.parkingInfoLine}"></span>距离您${data.routes[0].distance}米
                    </div>`,
          offset: [-15, -54],
        },
      ];
    },
  },
  mounted() {},
  watch: {
    "$store.state.location.selfLocation": {
      handler() {
        this.selfLocation();
      },
    },
    "$store.state.app.isClickCarsList": {
      handler(newValue) {
        if(!newValue)
          this.parkingInfo=[];
      },
    },
  },
};
</script>

<style>
.amap-box {
  height: 100vh;
}
</style>
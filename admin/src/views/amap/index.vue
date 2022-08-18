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
        :vid="'vue-amap'"
        class="amap-demo"
      >
        <!-- 标记 -->
        <!-- <el-amap-marker
          v-for="(marker, index) in markers"
          :position="marker"
          :key="index"
        ></el-amap-marker> -->
      </el-amap>
    </div>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import {
  getLngLat,
  amapsetMarker,
  cityToMap,
  amapclearMarker,
  destroyMap,
} from "./common";
let amapManager = new AMapManager();
export default {
  name: "Index",
  props: {
    options: {
      type: Object,
      default: ()=>{},
    },
  },
  data() {
    return {
      lnglat: "",
      name: "Map",
      map: null,
      zoom: 14,
      amapManager,
      events: {},
    };
  },
  mounted() {
    const self = this;
    lazyAMapApiLoaderInstance.load().then(() => {
      // your code ...
      // this.map = new AMap.Map("vue-amap", {
      //   center: [116.404765, 39.918052],
      //   zoom: this.zoom, //初始化地图
      // });
      this.mapCreate();
      this.map.on("click", function (e) {
        // console.log(getLngLat(e));
        const lnglat = getLngLat(e);
        self.lnglat = lnglat;
        self.$emit("lnglat", lnglat);
        self.setMarker();
      });
    });
  },
  methods: {
    mapCreate() {
      this.map = new AMap.Map("vue-amap", {
        center: [116.404765, 39.918052],
        zoom: this.zoom, //初始化地图
      });
      this.map.on("complete", () => {
        this.mapLoad();
      });
    },
    setMarker(lnglat) {
      amapsetMarker(lnglat || this.lnglat, this.map);
    },
    setMapCenter(value) {
      cityToMap(value, this.map);
    },
    clearMarker() {
      amapclearMarker(this.map);
    },
    //销毁地图
    mapDestroy() {
      destroyMap(this.map);
    },
    mapLoad() {
      if (this.options&&this.options.mapload) {
        this.$emit("callback", {
          function: "mapLoad",
        });
      }
    },
  },
};
</script>

<style>
.amap-box {
  height: 500px;
}
</style>
<template>
  <div>
    <!-- dom渲染 -->
    <Cars ref="cars" />
    <!-- 会员 -->
    <!-- 为什么:class="{}"可以而:id="{}"不可以 -->
    <div class="users" :id="[show ? 'open' : '']">
      <router-view></router-view>
    </div>
    <!-- 地图 -->
    <Map ref="map" @loadmap="loadmap" />
    <!-- 导航 -->
    <Navbar />
    <Login />
    <div
      class="cars_activation"
      v-if="cars_active_data && cars_active_data.order_no"
    >
      <router-link
        :to="{
          path: '/order',
          params: { order_no: cars_active_data.order_no },
        }"
        class="color-white"
        >正在使用的车辆</router-link
      >
    </div>
    <div
      class="button-groure"
      v-if="cars_active_data && cars_active_data.order_no"
    >
      <div v-if="cars_active_data.order_status == 'RETURN'">
        停车场：
        <el-button
          size="mini"
          v-for="item in parkinglist"
          :key="item.id"
          @click="parking_id = item.id"
          :type="parking_id == item.id ? 'primary' : ''"
          >{{ item.parkingName }}</el-button
        >
      </div>
      <el-button
        type="primary"
        size="small"
        @click="carsGet"
        v-if="cars_active_data.order_status == 'WAIT'"
        >取车</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="carsReturns"
        v-if="cars_active_data.order_status == 'RETURN'"
        >还车</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="carsCancel"
        v-if="cars_active_data.order_status == 'WAIT'"
        >取消</el-button
      >
    </div>
  </div>
</template>

<script>
import Map from "../amap/index.vue";
import Cars from "../cars/index.vue";
import Navbar from "../../components/navbar/index.vue";
import Login from "./login.vue";
import { GetParking } from "../../api/parking";
import {
  GetCarsActivation,
  CarsGet,
  CarsReturn,
  CarsReturns,
  CarsCancel,
} from "../../api/order";
export default {
  name: "Index",
  components: { Map, Cars, Navbar, Login },
  data() {
    return {
      cars_active_data: JSON.parse(localStorage.getItem("cars_active")),
      parkinglist: [],
      parking_id: "",
    };
  },
  computed: {
    show() {
      const routeName = this.$route.name;
      return routeName === "Index" ? false : true;
    },
  },
  methods: {
    loadmap() {
      this.getParking();
    },
    getWalking(e) {
      const data = e.target.getExtData();

      this.$refs.map.saveData({
        key: "parkingData",
        value: data,
      });
      this.$refs.map.walking(data.lnglat.split(","));
    },
    getCarsList(e) {
      const data = e.target.getExtData();
      if (this.$refs.cars) {
        this.$refs.cars.getCarsList(data);
      }
    },
    getParking() {
      GetParking().then((response) => {
        const data = response.data.data;
        data.forEach((item) => {
          item.position = item.lnglat.split(",");
          item.content =
            "<img src='" +
            require("@/assets/images/parking_location_img.png") +
            "' />";
          item.offset = [-35, -60];
          item.offsetText = [-30, -55];
          item.text = `<div style="width: 60px; font-size: 20px; color: #fff; text-align: center;line-height: 50px; height: 60px;">${item.carsNumber}</div>`;
          item.events = {
            click: (e) => {
              this.getWalking(e); //路线规划
              this.getCarsList(e); //车辆列表
            },
          };
        });
        this.$refs.map.saveparkingData(data);
        this.parkinglist = data;
      });
    },
    getCarsActivation() {
      GetCarsActivation().then((response) => {
        this.cars_active_data = response.data;
        localStorage.setItem(
          "cars_active",
          JSON.stringify(this.cars_active_data)
        );
      });
    },
    carsGet() {
      CarsGet({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id,
      }).then((response) => {
        const data = response.data;
        if (data && data.order_status) {
          // 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，
          // 修改参数更新视图
          this.$set(this.cars_active_data, "order_status", data.order_status);
          localStorage.setItem(
            "cars_active",
            JSON.stringify(this.cars_active_data)
          );
          this.$message({
            message: response.message,
            type: "success",
          });
        }
      });
    },
    carsReturns() {
      CarsReturns({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id,
        parking_id: this.parking_id,
      }).then((response) => {
        const data = response.data;
        this.cars_active_data = null;
        localStorage.removeItem("cars_active");
      }).catch(e=>{
        this.cars_active_data = null;
        localStorage.removeItem("cars_active");
      });
    },
    carsCancel() {
      CarsCancel({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id,
      }).then((response) => {
        const data = response.data;
        this.cars_active_data = null;
        localStorage.removeItem("cars_active");
        this.$message({
          message: response.message,
          type: "success",
        });
      });
    },
  },
  beforeMount() {
    !this.cars_active_data && this.getCarsActivation();
  },
};
</script>

<style>
.users {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -600px;
  width: 410px;
  background-color: #34393f;
  z-index: 101;
  transition: right 0.5s;
}
#open {
  right: 0px;
}
.cars_activation {
  position: fixed;
  left: 20px;
  top: 20px;
  border-radius: 100px;
  padding: 10px 20px;
  font-size: 12px;
  background-color: green;
  color: #fff;
}
.button-groure {
  position: fixed;
  left: 20px;
  top: 60px;
}
</style>









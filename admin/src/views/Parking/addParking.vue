<template>
  <div>
    <Form ref="form" :formData="form" :formItem="form_item" :formHandler="form_handler">
          <template v-slot:city="slotData">
            <CityArea ref="cityArea" :cityarea.sync="form.area"  @callback="setMapCenter"/>
          </template>
          <template v-slot:map="slotData">
            <Map @lnglat="getlnglat" ref="amap" @callback="mapLoad" :options="map_option"/>
          </template>
    </Form>
  </div>
</template>

<script>
import Map from "../amap/index.vue";
import { ParkingAdd, ParkingDetailed, ParkingEdit } from "../../api/parking";
import CityArea from "../../components/Common/cityArea.vue";
import Form  from "../../components/Form/Index.vue"
export default {
  name: "AddParking",
  components: { Map, CityArea ,Form},
  data() {
    return {
      //获取编辑id
      id: this.$route.params.id,
      loading: false,
      //表单数据配置
      form: {
        parkingName: "",
        area: "",
        address: "",
        type: 2,
        status: true,
        carsNumber: 20,
        lnglat: "",
      },
      // 表单配置
      form_item:[
        {type:"Input",label:"停车场名称",placeholder:"请输入停车场名称",prop:"parkingName",required:true},
        {type:"Slot",slotName:"city", label:"区域",prop:"area"},
        {type: "Input",label: "详细地址", placeholder: "请输入详细地址", prop: "address",},
        {type: "Radio",label: "类型",prop: "type",options: this.$store.state.config.parking_type},
        {type: "Number",label: "可停放车辆",prop: "carsNumber"},
        {type: "Radio",label: "禁启用",prop: "status",options: this.$store.state.config.radio_disabled},
        { type: "Slot", slotName: "map", label: "位置" },
        { type: "Input", label: "经纬度", prop: "lnglat",disabled:true,required:true},
      ],
      form_handler: [
            { label: "确定", key: "submit",  type: "primary", handler: () => this.submitForm('form') },
      ],
      rules: {
        parkingName: [
          { required: true, message: "请输入停车场名称", trigger: "blur" },
        ],
        lnglat: [
          { required: true, message: "请选择停车场位置", trigger: "blur" },
        ],
      },
      // 禁启用
      parking_status: this.$store.state.config.parking_status,
      // 停车场类型
      parking_type: this.$store.state.config.parking_type,
      //是否需要回调加在地图函数
      map_option: {
        mapload: true,
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          if(!this.id)
            this.addParking();
          else{
            this.editParking();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getlnglat(value) {
      this.form.lnglat = value.lng + "," + value.lat;
    },
    //新增停车场
    addParking() {
      ParkingAdd(this.form).then((response) => {
          this.loading = false;
          this.reset("form");
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    // 编辑停车场
    editParking(){
      let requestData=JSON.parse(JSON.stringify(this.form));
      requestData.id=this.id;
      ParkingEdit(requestData).then((response) => {
          this.loading = false;
          this.$router.push({
            name:'ParkingList'
          });
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    reset(formName) {
      this.$refs[formName].$refs.form.resetFields();
      //清除级联选择器
      this.$refs.cityArea.clear();
      //清除地图标记
      this.$refs.amap.clearMarker();
    },
    // 根据区域选择设置地图中心店
    setMapCenter(data) {
      this.$refs.amap.setMapCenter(data);
    },
    // id查询停车场
    getparkingDetailed() {
      if (this.id) {
        ParkingDetailed({ id: this.id }).then((response) => {
          for (let key in response.data) {
            if (Object.keys(this.form).includes(key)) {
              this.form[key] = response.data[key];
            }
          }
          //设置覆盖物
          const splitLnglat = response.data.lnglat.split(",");
          const lnglat = {
            lng: splitLnglat[0],
            lat: splitLnglat[1],
          };
          this.$refs.amap.setMarker(lnglat);
          //初始化省市区
          this.$refs.cityArea.initDefault(response.data.region);
        });
      }
    },
    //地图加载完成
    mapLoad() {
      // 调取id查询停车场
      this.getparkingDetailed();
    },
  },
  beforeMount() {},
};
</script>

<style scope>
.el-main {
  text-align: left;
}
</style>
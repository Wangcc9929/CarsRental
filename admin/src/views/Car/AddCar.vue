<template>
  <Form
    ref="Form"
    :formData="form"
    :formItem="form_item"
    :formHandler="form_handler"
  >
    <template v-slot:maintain>
      <el-row :gutter="30">
        <el-col :span="6">
          <!-- <el-date-picker
            v-model="form.maintainDate"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          ></el-date-picker> -->
          <el-date-picker
            v-model="form.maintainDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6">下次保养日期：2022-12-12</el-col>
      </el-row>
    </template>
    <template v-slot:energy>
      <el-radio-group v-model="form.energyType" @change="changeEnergyType">
        <el-radio
          v-for="item in energyType"
          :key="item.value"
          :label="item.value"
          >{{ item.label }}</el-radio
        >
      </el-radio-group>
      <div
        class="progress-bar-wrap"
        v-if="form.energyType == 3 || form.energyType == 1"
      >
        <span class="label-text">电量：</span>
        <el-row>
          <el-col :span="10">
            <el-slider v-model="form.electric" show-input></el-slider>
          </el-col>
        </el-row>
      </div>
      <div
        class="progress-bar-wrap"
        v-if="form.energyType == 3 || form.energyType == 2"
      >
        <span class="label-text">油量：</span>
        <el-row>
          <el-col :span="10">
            <el-slider v-model="form.oil" show-input></el-slider>
          </el-col>
        </el-row>
      </div>
    </template>
    <template v-slot:carsAttr>
      <CarsAttr ref="carsAttr" :val.sync="form.carsAttr" :initValue="form.carsAttr" :oil="form.oil" :countKm.sync="form.countKm"/>
    </template>
    <template v-slot:leaseList>
      <el-row :gutter="20">
        <el-col
          :span="4"
          v-for="item in leaseListData"
          :key="item.carsLeaseTypeId"
        >
          <div>{{ item.carsLeaseTypeName }}</div>
          <el-input-number
            v-model="item.price"
            controls-position="right"
            :min="0"
            :max="10000"
            placeholder="请输入价格"
            style="width: 100%"
          ></el-input-number>
        </el-col>
      </el-row>
    </template>
  </Form>
</template>

<script>
import Form from "../../components/Form/Index.vue";
import CarsAttr from "./component/addAttr.vue"
import { GetCarBrand, GetParking,GetQiniuToken } from "../../api/common";
import {CarsAdd,CarsEdit,CarsDetailed} from "../../api/cars"
import {LeaseList} from "../../api/lease"
export default {
  name: "AddCar",
  components: { Form,CarsAttr },
  data() {
    return {
      // 能源类型
      energyType: this.$store.state.config.energyType,
      //获取到的车辆品牌
      carsBrandList: [],
      //获取到的停车场
      parkingList: [],
      //车辆属性
      cars_attr:[],
      // 加载中
      loading:false,
      //编辑id
      id:this.$route.params.id,
      //获取租赁类型列表
      leaseListData:[],
      form: {
        parkingId: "",
        carsBrandId: "",
        carsMode: "",
        carsNumber: "",
        carsFrameNumber: "",
        engineNumber: "",
        carsImg: "",
        countKm: "",
        yearCheck: true,
        gear: 1,
        energyType: 2,
        electric: 100,
        oil: 100,
        carsAttr: "",
        content: "",
        maintainDate: "",
        status: true,
      },
      form_item: [
        {
          type: "Select",
          label: "车辆品牌",
          placeholder: "请选择车辆品牌",
          prop: "carsBrandId",
          options: [], //不可以直接赋值carsbrandlist，因为此时还未从接口获取数据carsbrandlist仍为空
          select_value: "id", // 自有的私有属性
          select_label: "nameCh",
          required:true
        },
        {
          type: "Select",
          label: "停车场",
          placeholder: "请选择停车场",
          prop: "parkingId",
          options: [],
          select_value: "id", // 自有的私有属性
          select_label: "parkingName",
          required:true
        },
        {
          type: "Input",
          label: "车辆型号",
          placeholder: "请输入车辆型号",
          prop: "carsMode",
          required:true
        },
        {
          type: "Input",
          label: "车牌号",
          placeholder: "请输入车牌号",
          prop: "carsNumber",
          required:true
        },
        {
          type: "Input",
          label: "车架号",
          placeholder: "请输入车架号",
          prop: "carsFrameNumber",
          required:true
        },
        {
          type: "Upload",
          label: "缩略图",
          placeholder: "请上传缩略图",
          prop: "carsImg",
        },
        {
          type: "Input",
          label: "发动机号",
          placeholder: "请输入发动机号",
          prop: "engineNumber",
          required:true
        },
        {
          type: "Radio",
          label: "年检",
          placeholder: "请选择年检",
          prop: "yearCheck",
          options: this.$store.state.config.year_check,
        },
        {
          type: "Slot",
          slotName: "maintain",
          prop: "maintainDate",
          label: "保养日期",
        },
        {
          type: "Radio",
          label: "档位",
          placeholder: "请选择档位",
          prop: "gear",
          options: this.$store.state.config.gear,
        },
        {
          type: "Slot",
          slotName: "energy",
          prop: "energyType",
          label: "能源类型",
        },
        {
          type: "Input",
          label: "可行驶公里",
          prop: "countKm",
          disabled:true,
        },
        {
          type: "Slot",
          slotName: "carsAttr",
          prop: "carsAttr",
          label: "车辆属性",
        },
        {
          type: "TextArea",
          prop: "content",
          label: "车辆描述",
        },
        {
          type: "Slot",
          slotName: "leaseList",
          prop: "lease",
          label: "租赁价格",
        },
        {
          type: "Radio",
          label: "禁启用",
          placeholder: "请选择禁启用",
          prop: "status",
          options: this.$store.state.config.radio_disabled,
        },
      ],
      form_handler: [
        {
          label: "确定",
          key: "submit",
          type: "danger",
          handler: () => this.submit(),
        },
        { label: "重置", key: "reset" },
      ],
    };
  },
  methods: {
    submit() {
      this.formatCarsAttr();
      this.$refs.Form.$refs.form.validate((valid) => {
        if (valid) {
          // this.loading = true;
          if(!this.id)
            this.addCars();
          else{
            this.editCars();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      
    },
    addCars(){
      CarsAdd({...this.form,leasePrice: this.leaseListData}).then(response=>{
        this.reset("Form");
        this.cars_attr=[];
      })
    },
    editCars(){
      CarsEdit({...this.form,id:this.id,leasePrice: this.leaseListData}).then((response) => {
          this.loading = false;
          this.$router.push({
            name:'CarList'
          });
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    addCarsAttr() {
      this.cars_attr.push({attr_key:"",attr_value:""})
    },
    removeCarsAttr(item){
      let index=this.cars_attr.indexOf(item);
      if(index!==-1){
        this.cars_attr.splice(index,1);
      }
    },
    reset(formName) {
      this.$refs[formName].$refs.form.resetFields();
    },
    getCarsBrand() {
      GetCarBrand().then((response) => {
        const data = response.data.data;
        if (data) {
          const carsBrand = this.form_item.filter(
            (item) => item.prop === "carsBrandId"
          );
          if (carsBrand.length > 0) {
            carsBrand[0].options = data;
          }
        }
      });
    },
    getParking() {
      GetParking().then((response) => {
        const data = response.data.data;
        if (data) {
          const parkingList = this.form_item.filter(
            (item) => item.prop === "parkingId"
          );
          if (parkingList.length > 0) {
            parkingList[0].options = data;
          }
        }
      });
    },
    // 根据id查询车辆详情
    getCarsDetailed() {
      if (this.id) {
        CarsDetailed({ id: this.id }).then((response) => {
          for (let key in response.data) {
            if (Object.keys(this.form).includes(key)) {
              this.form[key] = response.data[key];
            }
          }
          // 更新租赁类型数据
          this.leaseListData = response.data.leasePrice;
        });
      }
    },
    getCarsLeaseList(){
      if(this.id)  return false;
      LeaseList().then(response=>{
        this.leaseListData=response.data.data;
      });
    },
    //能量变化格式化
    changeEnergyType() {
      this.form.oil = 100;
      this.form.electric = 100;
    },
    formatCarsAttr(){
      this.$refs.carsAttr.callbackAttrs();
    },
    
  },
  created() {
    this.getCarsBrand();
    this.getParking();
    this.getCarsDetailed();
    this.getCarsLeaseList();
  },
};
</script>

<style lang="scss" scoped>
.cars-attr-list {
  margin-top: 15px;
  overflow: hidden;
}
</style>
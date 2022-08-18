<template>
  <div class="carsList">
    <!-- 列表 -->
    <Table ref="table" :config="table_config">
      <!-- 禁启用 -->
      <template v-slot:status="slotData">
        <el-switch
          @change="changeStatus(slotData.data)"
          v-model="slotData.data.status"
          :disabled="switch_disabled===slotData.data.id"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <!-- 查看地图 -->
      <!-- <template v-slot:lnglat="slotData">
        <el-button @click="showMap(slotData.data)" type="success"
          >查看位置</el-button
        >
      </template> -->
      <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button size="small" type="primary" @click="edit(slotData.data.id)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="warning"
          @click="deleteparking(slotData.data.id)"
          :loading="delete_loading===slotData.data.id"
          >删除</el-button
        >
        <el-button
          size="small"
          @click="cancellock(slotData.data.id)"
          >释放车辆</el-button
        >
      </template>
    </Table>
    <MapDiolog
      ref="mapdialog"
      :mapdialog.sync="mapdialog"
      :parking_data="current_parking"
    />
  </div>
</template>

<script>
import { ParkingList, ParkingDelect, ParkingStatus } from "../../api/parking";
import {CarsStatus,CarsDelete,CarsLock} from "../../api/cars"
import CityArea from "../../components/Common/cityArea.vue";
import MapDiolog from "../../components/Dialog/parkingMap.vue";
import Table from "../../components/Table/index.vue";
import Form from "../../components/Form/Index.vue"
import { address ,yearCheckType,energyType} from "../../utils/commom";
export default {
  name: "ParkingList",
  components: { CityArea, MapDiolog, Table, Form},
  data() {
    return {
      //表格配置
      table_config:{
         tabhead: [
             { label: "车辆品牌", prop: "nameCh" },
             { label: "车辆型号", prop: "carsMode" },
             { 
                 label: "车辆LOGO", 
                 prop: "imgUrl",
                 type: "image"
             },
             { 
                 label: "车辆图片", 
                 prop: "carsImg",
                 type: "image"
             },
             { 
                 label: "年检", 
                 prop: "yearCheck",
                 type: "function",
                 callback: (row, prop) => yearCheckType(row[prop]),
                 width: "100px"
             },
             { 
                 label: "能源类型", 
                 prop: "energyType",
                 type: "function",
                 callback: (row, prop) => energyType(row[prop]),
                 width: "100px"
             },
             { 
                 label: "禁启用",
                 prop: "status",
                 type: "slot",
                 slotName: "status",
                 width: "100px"
             },
             { 
                 label: "车辆状态", 
                 prop: "cars_status",
                 type: "function",
                 callback: (row) => {
                     const carsStatus = this.$store.state.config.cars_status;
                     const status = carsStatus[row.carsStatus];
                     return status ? status.zh : "";
                 }
             },
             { label: "停车场", prop: "parkingName" },
             { 
                 label: "区域",
                 prop: "address",
                 type: "function",
                 callback: (row, prop) => address(row[prop])
             },
             { 
                 label: "操作",
                 type: "slot",
                 slotName:"operation",
                 width: 300,
                //  default: {
                //      deleteButton: true,
                //      editButton: true,
                //      editButtonLink: "CarsAdd"
                //  },
                //  buttonGroup: [
                //      { label: "编辑", type: "danger", event: "link", name: "CarsAdd", key: "id", value: "id"},
                //      { label: "车辆释放", type: "", event: "button", handler: (data) => this.lock(data) },
                //  ]
             },
         ],
         form_item:[
          {label:"车辆品牌",prop:"nameCh",type:"Input"},
          {label:"禁启用",prop:"status",type:"Select",options:this.$store.state.config.radio_disabled}
         ],
         form_handler: [
          {label:"新增",prop:"add",type:"success",element:"link",router:"/carIndex/add"},
        ],
        url: "/cars/list/ ",
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
      },
      //查看地图弹窗
      mapdialog: false,
      //当前停车场信息
      current_parking: {},
      //选择器可用
      switch_disabled:"",
      //删除加载
      delete_loading:"",
    };
  },
  methods: {
    onSubmit() {
      const requestData = {
        pageSize: this.table_config.data.pageSize,
        pageNumber: this.table_config.data.pageNumber,
      };
      //过滤筛选
      const searchData = JSON.parse(JSON.stringify(this.form)); //深拷贝，防止修改form值
      for (let key in searchData) {
        if (searchData[key] || searchData[key] === false) {
          requestData[key] = searchData[key];
        }
      }
      console.log(searchData);
      // if (this.search_type && this.keyValue) {
      //   requestData[this.search_type] = this.keyValue;
      // }
      this.$refs.table.requestDataLoad(requestData);
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    showMap(value) {
      this.mapdialog = true;
      this.current_parking = value;
    },
    //修改查看地图弹窗
    changeVisiable(flag) {
      this.mapdialog = flag;
    },
    //编辑停车场信息
    edit(id) {
      this.$router.push({
        name: "AddCar",
        params: {
          id,
        },
      });
    },
    cancellock(id){
      CarsLock({id})
    },
    // 删除停车场
    deleteparking(id) {
      this.delete_loading=id,
      this.$confirm("此操作将永久删除该停车场, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          CarsDelete({ id }).then((response) => {
            this.delete_loading="";
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.$refs.table.requestDataLoad();
          }).catch(e=>{
            this.delete_loading="";
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改车辆状态
    changeStatus(data) {
      const requestData = {
        id: data.id,
        status: data.status,
      };
      this.switch_disabled = data.id;
      CarsStatus(requestData).then((response) => {
          this.$message({
            type: "success",
            message: response.message,
          });
          this.switch_disabled = "";
          // this.switch_flag = false;
        })
        .catch((error) => {
          this.switch_disabled = "";
          // this.switch_flag = false;
        });
    },
  },
  mounted() {
    // //绑定查看地图弹窗方法
    // this.$refs.mapdialog.$on("changeVisiable", this.changeVisiable);
  },
};
</script>

<style lang="scss" scoped>
.el-form-item__content {
  width: 150px;
}
</style> 
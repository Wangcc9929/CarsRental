<template>
  <div class="parkingList">
    <!-- 列表 -->
    <Table ref="table" :config="table_config">
      <!-- 禁启用 -->
      <template v-slot:status="slotData">
        <el-switch
          @change="changeStatus(slotData.data)"
          v-model="slotData.data.status"
          :disabled="switch_disabled === slotData.data.id"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <!-- 查看地图 -->
      <template v-slot:lnglat="slotData">
        <el-button @click="showMap(slotData.data)" type="success"
          >查看位置</el-button
        >
      </template>
      <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button size="small" type="primary" @click="edit(slotData.data.id)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="warning"
          @click="deleteparking(slotData.data.id)"
          :loading="delete_loading === slotData.data.id"
          >删除</el-button
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
import CityArea from "../../components/Common/cityArea.vue";
import MapDiolog from "../../components/Dialog/parkingMap.vue";
import Table from "../../components/Table/index.vue";
import Form from "../../components/Form/Index.vue";
import { parkingType, address } from "../../utils/commom";
export default {
  name: "ParkingList",
  components: { CityArea, MapDiolog, Table, Form },
  data() {
    return {
      form: {
        area: "",
        type: "",
        status: "",
      },
      //表格配置
      table_config: {
        tabhead: [
          { label: "停车场名称", prop: "parkingName" },
          {
            label: "类型",
            prop: "type",
            type: "function",
            callback: (row, prop) => parkingType(row[prop]),
          },
          {
            label: "区域",
            prop: "address",
            type: "function",
            callback: (row, prop) => address(row[prop]),
          },
          { label: "可停放车辆", prop: "carsNumber" },
          { label: "禁启用", prop: "status", type: "slot", slotName: "status" },
          {
            label: "查看位置",
            prop: "lnglat",
            type: "slot",
            slotName: "lnglat",
          },
          {
            label: "操作",
            type: "slot",
            slotName: "operation",
            // type: "operation",
            // default: {
            //   deleteButton: true,
            //   editButton: true,
            //   editButtonLink: "ParkingAdd",
            // },
          },
        ],
        url: "/parking/list/ ",
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
        form_item: [
          { type: "City", label: "区域" },
          {
            type: "Select",
            prop: "parkingType",
            label: "类型",
            options: this.$store.state.config.parking_type,
            width: "120px",
          },
          {
            type: "Select",
            prop: "status",
            label: "禁启用",
            options: this.$store.state.config.parking_status,
            width: "120px",
          },
          {
            type: "KeyWord",
            prop: "keyword",
            label: "关键字",
            options: [
              { label: "停车场", value: "parkingName" },
              { label: "详细区域", value: "address" },
            ],
          },
        ],
        form_handler: [
          {label:"新增",prop:"add",type:"success",element:"link",router:"/parkingIndex/add"},
        ],
        form_config: {
          resetButton: true,
        }
      },
      // options: [],
      //关键字
      search_type: "",
      keyValue: "",
      // 禁启用
      parking_status: this.$store.state.config.parking_status,
      // 停车场类型
      parking_type: this.$store.state.config.parking_type,
      //查看地图弹窗
      mapdialog: false,
      //当前停车场信息
      current_parking: {},
      //选择器可用
      switch_disabled: "",
      //删除加载
      delete_loading: "",
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
      if (this.search_type && this.keyValue) {
        requestData[this.search_type] = this.keyValue;
      }
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
        name: "AddParking",
        params: {
          id,
        },
      });
    },
    // 删除停车场
    deleteparking(id) {
      (this.delete_loading = id),
        this.$confirm("此操作将永久删除该停车场, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            ParkingDelect({ id })
              .then((response) => {
                this.delete_loading = "";
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.$refs.table.requestDataLoad();
              })
              .catch((e) => {
                this.delete_loading = "";
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
    },
    // 修改停车场状态
    changeStatus(data) {
      const requestData = {
        id: data.id,
        status: data.status,
      };
      this.switch_disabled = data.id;
      ParkingStatus(requestData)
        .then((response) => {
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
    //绑定查看地图弹窗方法
    this.$refs.mapdialog.$on("changeVisiable", this.changeVisiable);
  },
};
</script>

<style lang="scss" scoped>
.el-form-item__content {
  width: 150px;
}
</style> 
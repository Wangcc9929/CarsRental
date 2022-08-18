<template>
  <div>
    <TabalData ref="table" :config="table_config">
      <!-- 禁启用 -->
      <template v-slot:status="slotData">
        <el-switch
          @change="leaseStatus(slotData.data)"
          v-model="slotData.data.carsLeaseStatus"
          :disabled="switch_disabled === slotData.data.id"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button size="small" type="primary" @click="edit(slotData.data)"
          >编辑</el-button
        >
        <!-- <el-button
          size="small"
          type="warning"
          @click="delete(slotData.data.id)"
          :loading="delete_loading === slotData.data.id"
          >删除</el-button
        > -->
      </template>
    </TabalData>
    <AddLeaseType
      :flagVisible.sync="dialog_show"
      :data.sync="current_lease_data"
    />
  </div>
</template>
<script>
// 组件
import TabalData from "../../components/Table/index.vue";
import AddLeaseType from "../../components/Dialog/leaseType.vue";
// API
import {LeaseStatus} from "../../api/lease"
export default {
  name: "Cars",
  components: { TabalData, AddLeaseType },
  data() {
    return {
      // 表格配置
      table_config: {
        checkbox: false,
        tabhead: [
          { label: "租车类型", prop: "carsLeaseTypeName" },
          {
            label: "禁启用",
            prop: "carsLeaseStatus",
            type: "slot",
            slotName: "status",
          },
          { label: "车辆列表", prop: "carsList" },
          { label: "操作", type:"slot",slotName:"operation" },
        ],
        url: "/lease/list/", // 真实URL请求地址
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
        form_item: [
          {
            type: "KeyWord",
            prop: "keyword",
            label: "关键字",
            options: [{ label: "租车类型", value: "carsLeaseTypeName" }],
          },
        ],
        form_handler: [
          {
            label: "新增",
            prop: "add",
            type: "success",
            element: "button",
            handler: () => this.leaseTypeAddDialog(),
          },
        ],
        form_config: {
          resetButton: true,
        },
      },
      //添加属性弹窗
      dialog_show: false,
      switch_disabled: "",
      current_lease_data: {},
    };
  },
  methods: {
    // loadData() {
    //   this.$refs.table.requestData();
    // },
    // 禁启用
    leaseStatus(data) {
      LeaseStatus({ id: data.carsLeaseTypeId, status: data.carsLeaseStatus })
        .then((response) => {
          this.$message({
            message: response.message,
            type: "success",
          });
        })
        .catch((error) => {
          data.carsLeaseStatus = !value;
        });
    },
    edit(data) {
      // 获取的 data 是 JSON 对象
      const copyData = Object.assign({}, data);
      this.current_lease_data = copyData; // 引用类型
      this.dialog_show = true;
    },
    // 弹窗
    leaseTypeAddDialog() {
      this.dialog_show = true;
    },
    //Table和AddLease为两个兄弟组件 不好通信，除非利用父组件，因此可用vuex设置标记位监听是否需要更新列表
  },
  beforeMount() {},
};
</script>
<style lass="scss" scoped></style>

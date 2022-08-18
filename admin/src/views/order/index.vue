<template>
  <div>
    <TableData ref="table" :config="table_config">
      <template v-slot:operation="slotData">
        <el-button size="small" @click="order_wait(slotData.data)"
          >待取车</el-button
        >
        <el-button size="small" @click="order_overtime(slotData.data)"
          >取车超时</el-button
        >
        <el-button size="small" @click="order_over(slotData.data)"
          >订单完成</el-button
        >
        <el-button size="small" @click="order_cancel(slotData.data)"
          >订单取消</el-button
        >
        <el-button size="small" @click="order_return(slotData.data)"
          >待还车</el-button
        >
      </template>
    </TableData>
  </div>
</template>

<script>
import TableData from "../../components/Table";
import {
  OrderWait,
  OrderOvertime,
  OrderOver,
  OrderCancel,
  OrderReturn,
} from "../../api/order";
export default {
  name: "OrderList",
  components: { TableData },
  data() {
    return {
      // 表格配置
      table_config: {
        tabhead: [
          { label: "订单号", prop: "order_no" },
          {
            label: "状态",
            prop: "order_status",
            type: "function",
            callback: (row) => {
              const orderStatus = this.$store.state.config.order_status;
              const status = orderStatus[row.order_status];
              return status ? status.zh : "";
            },
          },
          {
            label: "日期",
            prop: "create_date",
            type: "function",
            callback: (row) => {
              // 空数据时
              if (!row.create_date) {
                return "";
              }
              // 分割日期
              const dateSplit = row.create_date.split(" ");
              return `${dateSplit[0]} <br/> ${dateSplit[1]}`;
            },
          },
          {
            label: "金额",
            prop: "amount",
          },

          {
            label: "操作",
            type: "slot",
            slotName: "operation",
            width: 550,
          },
        ],
        url: "/order/list/", // 真实URL请求地址
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
      },
    };
  },
  methods: {
    order_wait(data) {
      OrderWait({ order_no: data.order_no, cars_id: data.cars_id });
    },
    order_over(data) {
      OrderOver({ order_no: data.order_no, cars_id: data.cars_id });
    },
    order_overtime(data) {
      OrderOvertime({ order_no: data.order_no, cars_id: data.cars_id });
    },
    order_cancel(data) {
      OrderCancel({ order_no: data.order_no, cars_id: data.cars_id });
    },
    order_return(data) {
      OrderReturn({ order_no: data.order_no, cars_id: data.cars_id });
    },
  },
};
</script>

<style>
</style>
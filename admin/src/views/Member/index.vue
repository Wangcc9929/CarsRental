<template>
  <div>
    <!-- 表格数据 -->
    <TabalData ref="table" :config="table_config">
      <!-- 黑名单 -->
      <template v-slot:blacklist="slotData">
        <el-switch
          @change="updateBlacklist(slotData.data)"
          v-model="slotData.data.blacklist"
          :disabled="switch_disabled === slotData.data.memberId"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <!-- 实名认证 -->
      <template v-slot:check_real_name="slotData">
        <el-switch
          @change="updateReal(identity,slotData.data,slotData.data.check_real_name)"
          v-model="slotData.data.check_real_name"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <!-- 驾驶证 -->
      <template v-slot:check_cars="slotData">
        <el-switch
          @change="updateReal(drive,slotData.data,slotData.data.check_cars)"
          v-model="slotData.data.check_cars"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button size="small" @click="detail(slotData.data.memberId)"
          >查看详情</el-button
        >
        <el-button size="small" @click="edit(slotData.data.memberId)"
          >编辑</el-button
        >
        <el-button size="small" type="warning">删除</el-button>
        <el-button size="small" @click="amountClear(slotData.data)"
          >清空金额</el-button
        >
      </template>
      <!-- <template v-slot:realPhoto="slotData">
        <img :src="realPhoto" alt="" class="real-photo" @click="showPhoto(slotData)">
      </template> -->
    </TabalData>
    <!-- <RealPhoto :flagVisible.sync="dialog_show" :data="data_photo" :title="title" @callbackComponent="callbackComponent" />父组件往子组件传数据时，是一个单向数据流 -->
  </div>
</template>
<script>
import TabalData from "../../components/Table/index.vue";
// API
import {
  UpdateRealName,
  Blacklist,
  Photo,
  AmountClear,
} from "../../api/member";
export default {
  name: "Parking",
  components: { TabalData },
  data() {
    return {
      realPhoto: require("@/assets/logo.png"),
      // 弹窗的标题
      title: "",
      // 表格配置
      table_config: {
        tabhead: [
          {
            label: "用户名",
            prop: "username",
            width: 150,
          },
          {
            label: "真实姓名",
            prop: "truename",
          },
          {
            label: "租车订单",
            prop: "order",
          },
          {
            label: "违章预存金",
            prop: "illegalAmount",
          },
          {
            label: "押金",
            prop: "gilding",
          },
          {
            label: "余额",
            prop: "amount",
          },
          {
            label: "实名认证",
            prop: "check_real_name",
            type: "slot",
            slotName: "check_real_name",
          },
          {
            label: "驾驶证",
            prop: "check_cars",
            type: "slot",
            slotName: "check_cars",
            callback: (row, prop) => {
              return row[prop] ? "已认证" : "-";
            },
          },
          {
            label: "黑名单",
            prop: "blacklist",
            type: "slot",
            slotName: "blacklist",
            // handler: (status, data) => this.updateBlacklist(status, data),
          },
          {
            label: "操作",
            type: "slot",
            slotName: "operation",
            width: 350,
          },
        ],
        url: "/member/list/", // 真实URL请求地址
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
        form_item: [
          {
            label: "关键字",
            prop: "keyword",
            type: "KeyWord",
            options: [
              { value: "username", label: "用户名" },
              { value: "truename", label: "真实姓名" },
              { value: "card_id", label: "驾驶证" },
            ],
          },
        ],
        form_config: {
          resetButton: true,
        },
      },
      // row_id
      row_id: "",
      data_photo: {},
      // switch_disabled
      switch_disabled: "",
      // 弹窗标记
      dialog_show: false,
      form: {
        username: "",
      },
      identity:"identity",
      drive:"drive",
    };
  },
  methods: {
    callbackComponent(params) {
      console.log(params);
      if (params.function) {
        this[params.function]();
      }
    },
    /** 修改实名认证 */
    updateReal(type,data,status) {
      const requestData = {
        status,
        id: data.memberId,
        type,
      };
      UpdateRealName(requestData).then((response) => {
        const data = response;
        this.$message({
          message: response.message,
          type: "success",
        });
      });
    },
    /** 黑名单 */
    updateBlacklist(data) {
      const requestData = {
        id: data.memberId,
        status: data.blacklist,
      };
      this.switch_disabled = data.memberId;
      console.log(data);
      Blacklist(requestData)
        .then((response) => {
          const data = response;
          this.$message({
            message: response.message,
            type: "success",
          });
          this.switch_disabled = "";
        })
        .catch((error) => {
          this.switch_disabled = "";
        });
    },
    /** 图片 */
    // showPhoto(data){
    //   const type = data.type;
    //   // 更新弹窗标题
    //   this.title = type === "check_cars" ? "驾驶证" : "实名认证";
    //   // 接口
    //   const requestData = {
    //     id: data.data.memberId,
    //     type: type === "check_cars" ? "drive" : "identity"
    //   }
    //   Photo(requestData).then(response => {
    //     const data = response.data
    //     if(data) {
    //       this.data_photo = data;
    //       this.dialog_show = true;
    //     }
    //   })
    // },
    //查看详情
    detail(id) {
      this.$router.push({
        name: "MemberDetailed",
        params: {
          id,
        },
      });
    },
    /** 编辑 */
    edit(id) {
      this.$router.push({
        name: "MemberEdit",
        params: {
          id,
        },
      });
    },
    /** 清空金额 */
    amountClear(data) {
      AmountClear({ member_id: data.memberId });
    },
  },
};
</script>
<style lass="scss" scoped>
.real-photo {
  display: inline;
  width: 30px;
  margin-left: 5px;
  vertical-align: middle;
  cursor: pointer;
}
</style>
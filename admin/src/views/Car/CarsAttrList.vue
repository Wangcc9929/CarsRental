<template>
  <div>
    <TabalData ref="table" :config="table_config">
      <!--车辆公共属性-->
      <template v-slot:content>
        <div class="margin-bottom-25">
          <el-button
            :type="carsAttrList_id == item.id ? 'primary' : ''"
            size="small"
            :a="item.id"
            v-for="item in carsAttrList"
            :key="item.id"
            @click="getTypeList(item)"
          >
            {{ item.value }}
          </el-button>
        </div>
      </template>
    </TabalData>
    <AddCarsAttr :flagVisible.sync="dialog_show" :data="current_cars_type_data" />
  </div>
</template>
<script>
// 组件
import TabalData from "../../components/Table/index.vue";
import AddCarsAttr from"../../components/Dialog/carsAttr.vue"
// API
import { GetCarsTypeBasis, GetCarsTypeList } from "../../api/carsattr";
export default {
  name: "Cars",
  components: { TabalData ,AddCarsAttr},
  data() {
    return {
      // 表格配置
      table_config: {
        isRequest: false,
        checkbox: false,
        tabhead: [
          { label: "文本", prop: "value" },
          { label: "字段", prop: "key" },
        ],
        url: "/carsAttr/list/", // 真实URL请求地址
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
        form_item: [
          {
            type: "KeyWord",
            prop: "keyword",
            label: "关键字",
            options: [
              { label: "文本", value: "value" },
              { label: "字段", value: "key" },
            ],
          },
        ],
        form_handler: [
          {
            label: "新增",
            prop: "add",
            type: "success",
            element: "button",
            handler: () =>this.addCarsDialog(),
          },
        ],
        form_config: {
          resetButton: true,
        },
      },
      //车辆基础属性集合
      carsAttrList: [],
      carsAttrList_id: "",
      //添加属性弹窗
      dialog_show:false,
      current_cars_type_data:{},
    };
  },
  methods: {
    getCarsAttr() {
      return GetCarsTypeBasis().then((response) => {
        const data = response.data.data;
        this.carsAttrList = data;
        return data;
      });
    },
    // 在未选择公共属性时获取车辆第一个公共属性的自定义属性列表
    async getCarsAttrType(){
      const data = await this.getCarsAttr();
      //默认打开第一个公共属性的列表
      this.getTypeList(data[0]);
    },
    getTypeList(data) {
      this.carsAttrList_id = data.id;
      this.current_cars_type_data=data;
      this.getCarsTypeList();
    },
    getCarsTypeList() {
      this.$refs.table.requestDataLoad({typeId: this.carsAttrList_id});
      // GetCarsTypeList({ typeId: this.carsAttrList_id }).then((response) => {
      //   console.log(response);
      // });
    },
    addCarsDialog(){
      if(JSON.stringify(this.current_cars_type_data)!="{}")
        this.dialog_show=true;
      else{
        this.$message({
          message:"请选择车辆公共属性",
          type:"error",
        });
      }

    }
  },
  beforeMount() {
    this.getCarsAttrType();
  },
};
</script>
<style lass="scss" scoped></style>

<!--
1、第一个是异步问题，需要等公用属性列表加载完成再请求列表，
2、初始化页面不加载列表。

-->
<template>
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

<script>
import { GetCarsTypeBasis, GetCarsTypeList } from "../../../api/carsattr";
export default {
  data() {
    return {
      //车辆基础属性集合
      carsAttrList: [],
      carsAttrList_id: "",
      current_cars_type_data: {},
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
    getTypeList(data) {
      this.carsAttrList_id = data.id;
      this.current_cars_type_data=data;
      this.getCarsTypeList();
    },
    getCarsTypeList() {
      GetCarsTypeList({ typeId: this.carsAttrList_id }).then((response) => {
        this.$emit("getcarsAttr",{
          cars_attr:response.data.data,
          attr_basis: this.current_cars_type_data,
          });
      });
    },
  },
  beforeMount() {
    this.getCarsAttr();
  },
};
</script>

<style>
</style>
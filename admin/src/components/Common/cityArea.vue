<template>
  <el-cascader
    v-model="region"
    :props="props"
    @change="getchangeValue"
    :placeholder="cityvalue"
  ></el-cascader>
</template>

<script>
import { GetCity } from "../../api/common";
export default {
  name: "City",
  props: {
    cityarea: {
      type: String,
      default: "",
    },
  },
  data() {
    const self = this;
    return {
      address: [],
      addressData: {},
      region: "",
      //当前停车场区域值
      cityvalue:"",
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const level = node.level;
          const requestData = {}; //请求报文
          const jsondate = {
            0: { type: "province" },
            1: { type: "city", pre: "province" },
            2: { type: "area", pre: "city" },
          };
          requestData.type = jsondate[level].type;
          if (jsondate[level].pre) {
            requestData[`${jsondate[level].pre}_code`] = node.value;
          }
          GetCity(requestData).then((response) => {
            const data = response.data.data;
            const flag = jsondate[level].type.toUpperCase();
            data.forEach((element) => {
              element.value = element[`${flag}_CODE`];
              element.label = element[`${flag}_NAME`];
              if (level === 2) {
                element.leaf = level >= 2;
              }
            });
            self.addressData[jsondate[level].type]=data;
            resolve(data);
          });
          if (level !== 0) {
            self.getAddress(node);
          }
        },
      },
    };
  },
  methods: {
    //编辑停车场 获取值
    initDefault(value){
      if(value){
        this.cityvalue=value.split(",").join(" / ");
      }
    },
    getchangeValue(value) {
      this.$emit("update:cityarea", value.join());
      const lastcode=value[value.length-1];
      const area=this.addressData.area.filter(item=>item.value==lastcode)
      this.address[2]=area[0].label;
      this.$emit("callback", this.address.join(""));
    },
    getAddress(node) {
      const level = node.level - 1;
      this.address[level] = node.label;
      this.$emit("callback", this.address.join(""));
    },
    clear(){
        this.region="";
    }
  },
};
</script>

<style>
</style>
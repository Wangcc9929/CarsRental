<template>
  <div>
    <CarsBasis @getcarsAttr="getCarsAttr" />
    {{ countKm }}
    <el-form inline>
      <el-form-item
        v-for="item in cars_attr"
        :key="item.id"
        :label="item.value"
      >
        <el-input v-if="item.value" v-model="cars_attritem[attr_basis.key][item.key]"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CarsBasis from "./carsBasisAttr.vue";
export default {
  name: "CarsAttr",
  components: { CarsBasis },
  props: {
    initValue: {
      type: String,
      default: "",
    },
    oil: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    countKm() {
      if (
        !this.cars_attritem.basis ||
        !this.cars_attritem.basis.oil_consume ||
        !this.cars_attritem.car_body ||
        !this.cars_attritem.car_body.tank_volume
      ) {
        return "";
      }
      // 剩余油量
      const surplusOil =
        (this.oil * this.cars_attritem.car_body.tank_volume) / 100;
      // 计算公里
      const km = (surplusOil / this.cars_attritem.basis.oil_consume) * 100;
      this.$emit("update:countKm", km.toFixed(2));
    },
  },
  data() {
    return {
      //获取车辆属性列表
      cars_attr: [],
      attr_basis: {},
      //获取车辆的输入的属性值
      cars_attritem: {},
    };
  },
  methods: {
    getCarsAttr(data) {
      this.cars_attr = data.cars_attr;
      this.attr_basis = data.attr_basis;
      this.attrFormat();
    },
    callbackAttrs() {
      this.$emit("update:val", JSON.stringify(this.cars_attritem));
    },
    attrFormat() {
      // 自定义属性为空时，不执行
      if (this.cars_attritem.length == 0) {
        console.log(1);
        return false;
      }
      // 公用属性的 key
      const attrBasisKey = this.attr_basis.key;
      // 判断属性集合是否存在 公用属性的key，存在则不处理
      if (this.cars_attritem[attrBasisKey]) {
        return false;
      }
      // 处理自定义属性
      const attrJson = {};
      this.cars_attr.forEach((item) => {
        attrJson[item.key] = "";
      });
      // 更新属性集合
      this.$set(this.cars_attritem, attrBasisKey, attrJson);
      // 典型的问题
      // 动态绑定数据后，视图不渲染
      /**
       * this.$set(test，'bb', 11111)  // 更新指定对象中，某个 key 的数据。
       */
    },
  },
  watch: {
    initValue: {
      handler(newValue) {
        if (newValue) {
          this.cars_attritem = JSON.parse(newValue);
        }
      },
    },
  },
};
</script>

<style>
</style>
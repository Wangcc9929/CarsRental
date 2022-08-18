<template>
  <el-form inline ref="form" :model="formData">
    <el-form-item
      v-for="item in formItem"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
      :rules="item.rules"
    >
      <!-- Input-->
      <el-input
        v-if="item.type === 'Input'"
        v-model.trim="formData[item.prop]"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        :disabled="item.disabled"
      ></el-input>
      <!-- Select-->
      <el-select
        v-else-if="item.type === 'Select'"
        v-model="formData[item.prop]"
        placeholder="请选择"
        :style="{ width: item.width }"
        :disabled="item.disabled"
      >
        <el-option
          v-for="select in item.options"
          :key="select.value || select[item.select_value]"
          :label="select.label || select[item.select_label]"
          :value="select.value || select[item.select_value]"
        ></el-option>
      </el-select>
      <!-- city-->
      <div v-if="item.type === 'City'">
        <CityArea ref="cityArea" :cityarea.sync="city_value" />
      </div>
      <!-- KeyWord-->
      <div v-if="item.type === 'KeyWord'">
        <KeyWord ref="keyWord" :options="item.options" :value.sync="keyword" />
      </div>
      <!-- slot -->
      <slot v-if="item.type === 'Slot'" :name="item.slotName" />
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button  @click="reset" v-if="formConfig.resetButton"
        >重置</el-button
      >
      <template v-for="item in formHandler">
        <el-button
          v-if="item.element === 'link'"
          :key="item.key"
          :type="item.type"
        >
          <router-link :to="item.router">
            <span class="color-white">{{ item.label }}</span>
          </router-link>
        </el-button>
        <el-button
          v-if="item.element === 'button'"
          :key="item.key"
          :type="item.type"
          @click="item.handler && item.handler()"
        >
          {{ item.label }}
        </el-button>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import CityArea from "../Common/cityArea.vue";
import KeyWord from "../Common/keyWord.vue";

export default {
  name: "FormSearch",
  components: { CityArea, KeyWord },
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
    // 按钮
    formHandler: {
      type: Array,
      default: () => [],
    },
    formConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formData: {},
      city_value: "",
      keyword: {},
    };
  },
  methods: {
    search() {
      let searchData = {};
      console.log(this.formData);
      for (let key in this.formData) {
        if (this.formData[key]) {
          searchData[key] = this.formData[key];
        }
      }
      // 组件关键字
      if (this.$refs.keyWord && this.keyword.label && this.keyword.value) {
        searchData[this.keyword.label] = this.keyword.value;
      }
      // 组件省市区
      if (this.$refs.cityArea && this.city_value)
        searchData.area = this.city_value;
      this.$emit("search", searchData);
    },
    reset() {
      this.$refs.form.resetFields();
      if (this.$refs.cityArea&&this.$refs.cityArea[0].clear) {
        this.$refs.cityArea[0].clear();
      }
      if (this.$refs.keyWord&&this.$refs.keyWord[0].clear) this.$refs.keyWord[0].clear();
      this.search();
    },
    initFormData() {
      this.formItem.forEach((item) => {
        // rules 规则
        if (item.required) {
          this.rules(item);
        }
        // 自定义检验规则
        if (item.validator) {
          item.rules = item.validator;
        }
      });
    },
    //初始化字段
    initFormFelid(data) {
      const felid = {};
      this.formItem.forEach((item) => {
        if (item.prop) {
          felid[item.prop] = "";
        }
      });
      this.formData = felid;
    },
    // 验证规则
    rules(item) {
      const requiredRules = [
        {
          required: true,
          message:
            item.required_msg || `${this.type_msg[item.type]}${item.label}`,
          trigger: "change",
        },
      ];
      // 其他的 rules 规则
      if (item.rules && item.rules.length > 0) {
        item.rules = requiredRules.concat(item.rules);
      } else {
        item.rules = requiredRules;
      }
    },
  },
  beforeMount() {
    this.initFormData();
    this.initFormFelid();
  },
};
</script>

<style>
</style>
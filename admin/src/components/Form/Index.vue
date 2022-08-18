<template>
  <el-form ref="form" :model="formData" label-width="120px">
    <el-form-item
      v-for="item in formItem"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
      :rules="item.rules"
    >
      <!-- 输入框 -->
      <el-input
        v-if="item.type === 'Input'"
        v-model.trim="formData[item.prop]"
        :disabled="item.disabled"
      ></el-input>
      <!-- 可变输入框 -->
      <el-input
        v-else-if="item.type === 'TextArea'"
        type="textarea"
        v-model.trim="formData[item.prop]"
        :disabled="item.disabled"
      ></el-input>
      <!-- 插槽 -->
      <slot v-else-if="item.type === 'Slot'" :name="item.slotName"></slot>
      <!-- 数字框 -->
      <el-input-number
        v-else-if="item.type === 'Number'"
        v-model="formData[item.prop]"
        controls-position="right"
        :min="item.min || 0"
        :max="item.max || 10000"
      ></el-input-number>
      <!-- 单选框 -->
      <el-radio-group
        v-else-if="item.type === 'Radio'"
        v-model="formData[item.prop]"
      >
        <el-radio
          v-for="radio in item.options"
          :label="radio.value"
          :key="radio.value"
          >{{ radio.label }}</el-radio
        >
      </el-radio-group>
      <!-- 选择器 -->
      <el-select
        v-else-if="item.type === 'Select'"
        v-model="formData[item.prop]"
        placeholder="请选择"
      >
        <el-option
          v-for="select in item.options"
          :key="select.value||select[item.select_value]"
          :label="select.label||select[item.select_label]"
          :value="select.value||select[item.select_value]"
        ></el-option>
      </el-select>
      <!-- 上传图片 -->
      <UpLoad v-else-if="item.type === 'Upload'" :value.sync="formData[item.prop]" :imgUrl="formData[item.prop]"/>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item>
      <el-button
        v-for="item in formHandler"
        :key="item.key"
        :type="item.type"
        @click="item.handler && item.handler()"
      >
        {{ item.label }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UpLoad from "../Upload/Index.vue"
export default {
  name: "Form",
  components:{UpLoad},
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    formItem: {
      type: Array,
      default: () => [],
    },
    // 按钮
    formHandler: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      type_msg: {
        Input: "请输入",
        Number: "请输入",
        Radio: "请选择",
        Select: "请选择",
        Disabled: "请选择",
        Upload: "请上传",
      },
    };
  },
  methods: {
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
  watch: {
    formItem: {
      handler(newValue) {
        this.initFormData();
      },
      immediate: true,
    },
  },
  // beforeMount() {
  //     this.initFormData();
  // },
};
</script>

<style>
</style>
<template>
  <!--dialog 弹窗
    子组件接收父组件的数据，是通过属性接收
  -->
  <el-dialog title="车辆自定义属性添加" width="30%" :visible.sync="dialogVisible" class="cars-dialog-center" @close="close" @opened="opened" :close-on-click-modal="false">
    <Form ref="form" :formData="form_data" :formItem="form_item" :formHandler="form_handler"></Form>
  </el-dialog>
</template>

<script>
// 组件
import Form from "../Form/Index.vue";
// API
import { CarsTypeAdd } from "../../api/carsattr";
export default {
  name: "",
  components: { Form },
  props: {
    flagVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      defult: () => {}
    }
  },
  data() {
    return {
      // 弹窗显示/关闭标记
      dialogVisible: false,
      // 表单数据
      form_data: {
        key: "",
        value: "",
        typeValue: ""
      },
      // 表单项
      form_item: [
        { type: "Input", label: "当前属性", prop: "typeValue", disabled: true, },
        { type: "Input", label: "字段", prop: "key" ,required:true},
        { type: "Input", label: "文本", prop: "value" ,required:true},
      ],
      // 表单按钮
      form_handler: [
        { label: "确定", key: "submit",  type: "danger", handler: () => this.submit() }
      ],
      // 状态
      radio_disabled: this.$store.state.config.radio_disabled,
      // 选中的LOGO
      logo_current: "",
      // logo
      logo: []
    };
  },
  methods: {
    opened(){},
    /** 提交 */
    submit(){
      this.$refs.form.$refs.form.validate((valid) => {
        if (valid) {
          // this.loading = true;
            this.add();
        } else {
          return false;
        }
      });
    },
    add(){
      const requestData = {
        typeId: this.data.id,
        key: this.form_data.key,
        value: this.form_data.value
      }
      CarsTypeAdd(requestData).then(response => {
        this.$message({
          message: response.message,
          type: "success"
        })
        this.reset()
      })
    },
    /** 重置表单 */
    reset(formName){
      this.$refs.form.$refs.form.resetFields();
    },
    close() {
      this.reset("form");
      // 关闭窗口
      this.dialogVisible = false;
      this.$emit("update:flagVisible", false); // {}
    }
  },
  watch: {
    flagVisible: {
      handler(newValue, oldValue) {
        this.dialogVisible = newValue;
      }
    },
    data: {
      handler(newValue) {
        this.form_data.typeValue = newValue.value;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
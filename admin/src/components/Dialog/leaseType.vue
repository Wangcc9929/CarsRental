<template>
  <!--dialog 弹窗
    子组件接收父组件的数据，是通过属性接收
  -->
  <el-dialog title="新增租车类型" width="30%" :visible.sync="dialogVisible" class="cars-dialog-center" @close="close" @opened="opened" :close-on-click-modal="false">
    <Form ref="form" :formData="form_data" :formItem="form_item" :formHandler="form_handler"></Form>
  </el-dialog>
</template>

<script>
// 组件
import Form from "../Form/Index.vue";
// API
import { LeaseAdd, LeaseEdit } from "../../api/lease";
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
        carsLeaseTypeName: "",
        carsLeaseStatus: "",
        carsLeaseDesc: "",
      },
      // 表单项
      form_item: [
        { type: "Input", label: "租车类型", prop: "carsLeaseTypeName", required:true},
        { type: "Radio", label: "禁启用状态", prop: "carsLeaseStatus",options: this.$store.state.config.radio_disabled ,required:true},
        { type: "TextArea", label: "描述", prop: "carsLeaseDesc" },
      ],
      // 表单按钮
      form_handler: [
        { label: "确定", key: "submit",  type: "danger", handler: () => this.submit() }
      ],

    };
  },
  methods: {
    opened(){},
    /** 提交 */
    submit(){
     this.$refs.form.$refs.form.validate((valid) => {
        if (valid) {
          // this.loading = true;
          this.form_data.carsLeaseTypeId?this.edit():this.add();
        } else {
          return false;
        }
      });
    },
    add(){
      LeaseAdd({...this.form_data}).then(response => {
        this.$message({
          message: response.message,
          type: "success"
        })
        this.$store.commit("watcher/SET_TABLE_DATA_FLAG");
        this.reset();
      })
    },
    edit(){
      LeaseEdit({...this.form_data}).then(response => {
        this.$message({
          message: response.message,
          type: "success"
        })
        this.$store.commit("watcher/SET_TABLE_DATA_FLAG");
        this.close();
      })
    },
    /** 重置表单 */
    reset(formName){
      this.$refs.form.$refs.form.resetFields();
      this.$emit("update:data",{});
    },
    close() {
      this.reset("form");
      // 关闭窗口
      this.dialogVisible = false;
      // for(let key in this.form_data){
      //   this.form_data[key]="";
      // }
      delete this.form_data.carsLeaseId;
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
        this.form_data = newValue;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
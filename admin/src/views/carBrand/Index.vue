<template>
  <div class="parkingList">
    <!--<el-row>
      <el-col :span="20">
        
         筛选表单 
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="车辆品牌">
            <el-input v-model="form.brand"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button size="small" type="primary" @click="dialogFormVisible = true">新建车辆品牌</el-button>
      </el-col>
    </el-row>-->

    <!-- 列表 -->
    <Table ref="table" :config="table_config">
      <!-- 禁启用 -->
      <template v-slot:status="slotData">
        <el-switch
          @change="changeStatus(slotData.data)"
          v-model="slotData.data.status"
          :disabled="switch_disabled===slotData.data.id"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button size="small" type="primary" @click="edit(slotData.data.id)">编辑</el-button>
        <el-button
          size="small"
          type="warning"
          @click="deletebrand(slotData.data.id)"
          :loading="delete_loading===slotData.data.id"
          >删除</el-button
        >
      </template>
    </Table>
    <AddCarBrand ref="dialog" :dialogFormVisible.sync="dialogFormVisible" :id.sync="data_id" @reflashlist="search"/>
  </div>
</template>

<script>
import AddCarBrand from '../../components/Dialog/carBrand.vue'
import Table from "../../components/Table/index.vue"
import Form from "../../components/Form/Index.vue"
import {BrandStatus,BrandDelect} from "../../api/carbrand"
export default {
  name: "carBrand",
  components:{AddCarBrand,Table},
  data() {
    return {
      // form: {
      //   brand: "",
      // },
      table_config: {
        // 如果不需要搜索框配置false
        // search_form:false,
        tabhead: [
          { label: "Logo",
            prop: "imgUrl",
            type:"image",
          },
          {
            label: "汽车品牌",
            prop: "nameCh",
            type: "function",
            callback: (row, prop) => `${row.nameCh}/${row.nameEn}`,
          },
          { label: "禁启用", prop: "status", type: "slot", slotName: "status" },
          {
            label: "操作",
            type: "slot",
            slotName: "operation",
          },
        ],
        url: "/brand/list/ ",
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
        form_item:[
          {
            type: "Input",
            prop: "brand",
            label: "车辆品牌",
            width: "120px",
          },
        ],
        form_handler:[
          {label:"新增车辆品牌",prop:"add",element:"button",handler:()=>{this.dialogFormVisible=true;}}
        ],
        form_config: {
          resetButton: true,
        }
      },
      dialogFormVisible:false,
      switch_disabled:"",
      delete_loading:"",
      data_id:""
    };
  },
  methods: {
    changeVisiable(flag){
        this.dialogFormVisible=flag;
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    edit(id) {
      this.dialogFormVisible=true;
      this.data_id=id;
      // this.$router.push({
      //   name: "AddParking",
      //   params: {
      //     id,
      //   },
      // });
    },
    // 删除品牌
    deletebrand(id) {
      this.delete_loading=id,
      this.$confirm("此操作将永久删除该品牌, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          BrandDelect({ id }).then((response) => {
            this.delete_loading="";
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.$refs.table.requestDataLoad();
          }).catch(e=>{
            this.delete_loading="";
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改品牌状态
    changeStatus(data) {
      const requestData = {
        id: data.id,
        status: data.status,
      };
      this.switch_disabled = data.id;
      BrandStatus(requestData).then((response) => {
          this.$message({
            type: "success",
            message: response.message,
          });
          this.switch_disabled = "";
          // this.switch_flag = false;
        })
        .catch((error) => {
          this.switch_disabled = "";
          // this.switch_flag = false;
        });
    },
    //查询
    search(){
      const requestData = {
        pageSize: this.table_config.data.pageSize,
        pageNumber: this.table_config.data.pageNumber,
      };
      //过滤筛选
      const searchData = JSON.parse(JSON.stringify(this.form)); //深拷贝，防止修改form值
      for (let key in searchData) {
        if (searchData[key] || searchData[key] === false) {
          requestData[key] = searchData[key];
        }
      }
      if (this.search_type && this.keyValue) {
        requestData[this.search_type] = this.keyValue;
      }
      this.$refs.table.requestDataLoad(requestData);
    }
  },
  mounted() {
    this.$refs.dialog.$on('changeVisiable',this.changeVisiable);
  },
};
</script>

<style>
</style>
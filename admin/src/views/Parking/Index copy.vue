<template>
  <div class="parkingList">
    <el-row>
      <el-col :span="20">
        <!-- 筛选表单 -->
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="区域" style="width=120px">
            <CityArea ref="cityArea" :cityarea.sync="form.area" />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="form.type">
              <el-option
                v-for="item in parking_type"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="禁启用">
            <el-select v-model="form.status">
              <el-option
                v-for="item in parking_status"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字">
            <el-select v-model="search_type">
              <el-option label="停车场名称" value="parkingName"></el-option>
              <el-option label="详细位置" value="address"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入关键字" v-model="keyValue"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <router-link to="/parkingIndex/add">
          <el-button size="small" type="primary">新建停车场</el-button>
        </router-link>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="parkingName" label="停车场名称"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <span>{{ getType(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="区域"></el-table-column>
      <el-table-column prop="carsNumber" label="可停放车辆"></el-table-column>
      <el-table-column prop="status" label="禁启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="lnglat" label="查看位置">
        <template slot-scope="scope">
          <el-button @click="showMap(scope.row)" type="success"
            >查看位置</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="warning"
            @click="deleteparking(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <MapDiolog
      ref="mapdialog"
      :mapdialog.sync="mapdialog"
      :parking_data="current_parking"
    />
    <el-pagination
      class="pagin"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { ParkingList, ParkingDelect } from "../../api/parking";
import CityArea from "../../components/Common/cityArea.vue";
import MapDiolog from "../../components/Dialog/parkingMap.vue";
export default {
  name: "ParkingList",
  components: { CityArea, MapDiolog },
  data() {
    return {
      form: {
        area: "",
        type: "",
        status: "",
      },
      tableData: [],
      options: [],
      //当前页码
      currentPage: 1,
      //请求API页码
      pageSize: 10,
      pageNumber: 1,
      //页码
      total: 0,
      //关键字
      search_type: "",
      keyValue: "",
      // 禁启用
      parking_status: this.$store.state.config.parking_status,
      // 停车场类型
      parking_type: this.$store.state.config.parking_type,
      //查看地图弹窗
      mapdialog: false,
      //当前停车场信息
      current_parking: {},
    };
  },
  methods: {
    onSubmit() {
      this.getParkingList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取停车场列表
    getParkingList() {
      const requestData = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
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
      ParkingList(requestData).then((response) => {
        this.tableData = response.data.data;
        if (response.data.total) this.total = response.data.total;
      }).catch(e=>{
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getParkingList();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    showMap(value) {
      this.mapdialog = true;
      this.current_parking = value;
    },
    //修改查看地图弹窗
    changeVisiable(flag) {
      this.mapdialog = flag;
    },
    //编辑停车场信息
    edit(id) {
      this.$router.push({
        name: "AddParking",
        params: {
          id,
        },
      });
    },
    // 删除停车场
    deleteparking(id) {
      this.$confirm("此操作将永久删除该停车场, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ParkingDelect({ id }).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getParkingList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 返回类型文本
    getType(value) {
      const data = this.parking_type.filter((item) => item.value == value);
      if (data && data.length > 0) {
        return data[0].label;
      }
    },
  },
  beforeMount() {
    this.getParkingList();
  },
  mounted() {
    //绑定查看地图弹窗方法
    this.$refs.mapdialog.$on("changeVisiable", this.changeVisiable);
  },
};
</script>

<style lang="scss" scoped>
.pagin {
  float: right;
  margin: 30px 0;
}
.el-form-item__content {
  width: 150px;
}
</style> 
<template>
  <div>
    <!-- form表单 -->
    <el-row :gutter="5">
      <el-col :span="20" type="flex">
        <el-form ref="form" :model="form" :inline="true">
          <el-form-item label="角色类型">
            <el-select v-model="form.roleType" placeholder="请选择角色类型">
              <el-option label="Lucky" value="Lucky"></el-option>
              <el-option label="Jucey" value="Jucey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option label="启用" value="true"></el-option>
              <el-option label="禁用" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字">
            <el-select v-model="form.importantType">
              <el-option label="手机号" value="phone"></el-option>
              <el-option label="用户名" value="username"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.important"
              placeholder="请选择关键字"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button>搜索</el-button>
            <el-button>重置</el-button>
            <el-button>导出</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-form>
          <el-form-item>
            <el-button type="primary" @click="dialogFormVisible = true">新建角色</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <Dialog ref="dialog" :dialogFormVisible.sync="dialogFormVisible"/>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="date" label="日期" width="140">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
        <!-- <template slot-scope="scope">
            <span size="medium">{{ scope.row.name }}</span>
      </template> -->
      </el-table-column>
      <el-table-column prop="address" label="地址">
        <!-- <template slot-scope="scope">
        <span size="medium">{{ scope.row.address }}</span>
      </template> -->
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Dialog from '../../components/Dialog/User.vue'
import {UserList} from '../../api/user'
export default {
  name: "User",
  components:{Dialog},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: true,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: true,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: true,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: true,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: true,
        },
      ],
      form: {
        roleType: "",
        importantType: "",
        important: "",
        status: "",
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changevisable(flag){
      this.dialogFormVisible=flag;
    },
    getUserList(){
      UserList({pageSize:10,pageNumber:1}).then(response=>{
        console.log("success"+response);
      },err=>{
        console.log(err);
      })
    }
  },
  mounted() {
			this.$refs.dialog.$on('changeVisable',this.changevisable) //绑定自定义事件
		},
};
</script>

<style scope>
.el-form--inline .el-form-item__label {
  float: left;
  display: inline-block;
}
.el-main {
    line-height: 20px;
}
</style>
<template>
  <div>
    <FormSearch 
    :formItem="table_config.form_item" 
    :formHandler="table_config.form_handler" 
    :formConfig="table_config.form_config"
    v-if="table_config.search_form"
    @search="search"
    />
    <slot name="content">
    </slot>
    <el-table
      v-loading="table_loading"
      element-loading-text="拼命加载中"
      :data="table_data"
      style="width: 100%"
    >
      <el-table-column
        v-if="table_config.checkbox"
        type="selection"
      ></el-table-column>
      <template v-for="item in table_config.tabhead">
        <!-- 插槽 -->
        <el-table-column
          v-if="item.type === 'slot'"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- 回调 -->
        <el-table-column
          v-else-if="item.type === 'function'"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span
              v-html="item.callback && item.callback(scope.row, item.prop)"
            ></span>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          v-else-if="item.type === 'function'"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span
              v-html="item.callback && item.callback(scope.row, item.prop)"
            ></span>
          </template>
        </el-table-column>
        <!-- 图片加载 -->
        <el-table-column
          v-else-if="item.type === 'image'"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <img :src="scope.row[item.prop]" :width="item.imgwidth || 50" />
          </template>
        </el-table-column>
        <!-- 纯文本渲染 -->
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :disabled="item.disabled"
          :width="item.width"
        ></el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="table_config.pagition"
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
import { GetTableData } from "../../api/common";
import FormSearch from "../../components/formSearch/Index.vue";
export default {
  name: "Table",
  components: { FormSearch },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      //data中的数据不能互相引用
      //  // 禁启用
      // parking_status: this.$store.state.config.parking_status,
      // // 停车场类型
      // parking_type: this.$store.state.config.parking_type,
      table_config: {
        tabhead: [],
        checkbox: true,
        //初始化是否调用接口
        isRequest:true,
        url: "",
        pagition: true,
        data: {},
        search_form:  true,
        //搜索表单数据
        form_item:[],
        form_handler: [],
        form_config: {
          resetButton: false
        }
      },
      table_data: [],
      //搜索表单数据
      currentPage: 1,
      total: 0,
      table_loading: false,
    };
  },
  methods: {
    initConfig() {
      for (let key in this.config) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key];
        }
      }
      console.log(this.config.form_item)
      //配置完成后读取接口数据
      this.table_config.isRequest&&this.loadData();
    },
    //搜索回调
    search(searchData) {
      searchData.pageSize=10;
      searchData.pageNumber=1;
      console.log(searchData);
      this.requestDataLoad(searchData);
    },
    loadData() {
      this.table_loading = true;
      let requestData = {
          url: this.table_config.url,
          data: this.table_config.data,
        };

      GetTableData(requestData)
        .then((response) => {
          const data = response.data;
          if (data) {
            this.table_data = data.data;
          }
          if (data.total) this.total = data.total;
          this.table_loading = false;
        })
        .catch((e) => {
          this.table_loading = false;
        });
    },
    // 外部传参加载数据
    requestDataLoad(params = "") {
      if (params) {
        this.table_config.data = params;
      }
      this.loadData();
    },
    //页码设置
    handleSizeChange(val) {
      this.table_config.data.pageSize = val;
      this.loadData();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },

    watch: {
      "$store.state.watcher.table_loadData_flag": {
        handler(newValue) {
          this.loadData();
        },
      },
    },
  beforeMount() {
    //初始化数值，和watch二选一
    this.initConfig();
  },
};
</script>

<style lang=:"scss" scoped>
.pagin {
  float: right;
  margin: 30px 0;
}
</style>
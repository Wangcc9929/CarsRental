<template>
  <div>
    <i class="el-icon-s-fold" @click="changecoll()"></i>
    <div class="droplink" type="primary">
      <el-dropdown >
      <img src="../../../assets/face.jpg">
      <template v-slot:dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            18036367765
          </el-dropdown-item>
          <el-dropdown-item>
            中文  英文
          </el-dropdown-item>
          <el-dropdown-item>
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "HeaderNav",
  methods: {
    ...mapMutations({changecoll:'CHANGECOLL'}),
  },
};
</script>

<style lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: #000;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.droplink {
  float: right;
  padding:10px 0;
  img{
    width: 40px;
    border-radius: 100px;
  }
}
.el-icon-s-fold{
  padding: 10px;
  float: left;
  font-size: 30px;
  cursor: pointer;
}
</style>
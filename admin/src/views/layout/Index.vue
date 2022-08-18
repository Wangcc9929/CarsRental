<template>
  <el-container>
    <el-aside>
      <AsideNav />
    </el-aside>
    <el-container>
      <el-header>
        <HeaderNav />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderNav from "./components/HeaderNav";
import Main from "./components/Main";
import AsideNav from "./components/AsideNav/AsideNav.vue";
import {mapState} from 'vuex';
export default {
  name: "Index",
  components: { HeaderNav, Main, AsideNav },
  computed:{
  }
};
</script>

<style>
.el-aside {
    width: auto !important;
    height: 100vh;
}
.el-container {
  height: 100vh;
}
.el-header,
.el-footer {
  width: 100%;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :collapse="isCollapse"
        >
          <h1 id="logo">
            <img :src="logo" />
          </h1>
          <template v-for="item in routes">
            <template v-if="!item.hidden">
              <template v-if="!item.children">
                <el-menu-item :index="item.path">
                  <i :class="item.meta.icon"></i>
                  <span slot="title">{{ item.meta.title }}</span>
                </el-menu-item>
              </template>

              <!-- 存在子路由  需要二级目录 -->
              <Menu v-else :menu="item" />
            </template>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Menu from "./Menu.vue";
export default {
  name: "AsideNav",
  components: { Menu },
  data() {
    return {
      routes: this.$router.options.routes,
      logo: require("../../../../assets/logo.png"),
    };
  },
  computed: {
    ...mapState(["isCollapse"]),
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // hasOnlyChildren(item) {
    //   if (!item.children) return false;
    //   const route = item.children.filter((item) =>
    //     item.hidden ? false : true
    //   );
    //   if (route.length <= 1) {
    //     return true;
    //   }
    //   return false;
    // },
  },
  // mounted() {
  //   console.log(this.$router.options.routes)
  // },
};
</script>

<style lang="scss">
.el-menu {
  border: 0;
  font-size: 20px;
}
h1 {
  // margin: 30px auto;
  text-align: center;
  img {
    display: inline-block;
    width: 30px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
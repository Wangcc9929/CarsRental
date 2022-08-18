<template>
  <el-submenu :index="menu.path">
    <template slot="title">
      <i :class="menu.meta.icon"></i>
      <span>{{ menu.meta.title }}</span>
    </template>
    <template v-for="item in menu.children">
      <template v-if="!item.hidden">
          <el-menu-item v-if="!item.children" :index="item.path">{{item.meta.title}}</el-menu-item>
        <Menu v-else :menu="item"/>
      </template>
    </template>
  </el-submenu> 
</template>


<script>
export default {
  name:"Menu",
  props: {
    menu: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style>
</style>
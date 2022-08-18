<template>
  <div class="navbar">
    <ul>
      <li><i class="icon-help icon-w-44"></i></li>
      <li><i class="icon-search icon-w-44"></i></li>
      <li>
        <a href="#" class="selectCarBtn">选择车辆</a>
      </li>
      <li><i class="icon-location icon-w-44" @click="selfLocation"></i></li>
      <li><i class="icon-user icon-w-44" @click="pushuser"></i></li>
    </ul>
  </div>
</template>

<script>
import {getToken} from "../../utils/cookiesCars"
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    selfLocation() {
      this.$store.commit("location/SELF_LOCATION");
    },
    pushuser() {
      this.$router.push({
       name: getToken() ? "User" : "Login"
      });
    },
  },
};
</script>

<style lang='scss'>
.navbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 86px;
  z-index: 10;
  text-align: center;
  li {
    display: inline-block;
  }
  [class^="icon"] {
    vertical-align: middle;
    margin: 0 17px;
    cursor: pointer;
  }
}
.selectCarBtn {
  display: inline-block;
  width: 240px;
  height: 84px;
  background-color: #34393f;
  border-radius: 100px;
  line-height: 84px;
  margin: 0 17px;
  text-align: center;
  color: #fff;
  font-size: 26px;
}
</style>
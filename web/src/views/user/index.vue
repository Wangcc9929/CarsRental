<template>
  <div class="UserWap">
    <div class="UserInfo usermargin">
      <img src="../../assets/images/face.jpg" alt="" />
      <div class="meta">
        <h4 class="name">2246386255@qq.com</h4>
        <span>文明驾驶分 <strong>0</strong></span>
      </div>
    </div>
    <ul class="groupLink">
      <router-link to="/my" tag="a" class="arrow">
        <i class="icon icon-user-link-1"></i>
        我的账号
      </router-link>
      <router-link to="/order" tag="a" class="arrow">
        <i class="icon icon-user-link-2"></i>
        租车订单
      </router-link>
      <router-link to="/authentication" tag="a" class="arrow">
        <i class="icon icon-user-link-3"></i>
        实名认证
      </router-link>
      <router-link to="/safe" tag="a" class="arrow">
        <i class="icon icon-user-link-4"></i>
        安全设置
      </router-link>
      <router-link to="" tag="a" class="arrow">
        <i class="icon icon-user-link-5"></i>
        帮助中心
      </router-link>
    </ul>
    <button class="logout" @click="logout">登出</button>
  </div>
</template>

<script>
import { removeToken, removeUsername } from "../../utils/cookiesCars";
export default {
  name: "User",
  methods: {
    logout() {
      removeToken();
      removeUsername();
      this.$router.push({
        name: "Index",
      });
    },
  },
};
</script>

<style lang="scss";>
.UserInfo {
  display: flex;
  margin: 0 30px;
  padding: 84px 0 80px 10px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 6px solid #2f343a;
  }
  .meta {
    flex: 1;
    padding-left: 17px;
    .name {
      font-size: 18px;
      line-height: 43px;
      color: #909090;
    }
    span {
      display: inline-block;
      height: 27px;
      padding: 0 17px;
      background-color: #10a0f2;
      border-radius: 100px;
      line-height: 27px;
      color: #fff;
      font-size: 14px;
    }
  }
}
.logout {
  position: absolute;
  left: 50%;
  margin-left: -82px;
  width: 165px;
  bottom: 60px;
  height: 58px;
  background-color: #2d3339;
  border-radius: 100px;
  text-align: center;
  line-height: 58px;
  color: #fff;
  font-size: 18px;
  border: none;
  outline: none;
}
</style>
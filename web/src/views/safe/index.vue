<template>
  <div class="user-safe usermargin">
    <Back column="安全设置"/>
    <ul class="groupLink">
      <router-link to='/password' tag="a" class="arrow">
        修改登录密码
      </router-link>
      <router-link to='/paypass' tag="a" class="arrow">
        设置资金密码
      </router-link>
      <router-link to='/phone' tag="a" class="arrow">
        绑定手机号
      </router-link>
      <router-link to='/bank' tag="a" class="arrow">
        绑定银行卡
      </router-link>
  </ul>
  </div>
</template>

<script>
export default {
    name:'Safe',
}
</script>

<style>

</style>
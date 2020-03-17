<template>
  <div class="container">
    <!-- 导航 -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 登录布局 -->
    <van-cell-group style="margin-top:20px">
      <!-- 手机号 -->
      <van-field
        v-model="username"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '手机号不能为空' }]"
      />
      <!-- 验证码 -->
      <van-field
        v-model="password"
        type="password"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '密码不能为空' }]"
        style="margin-top:10px"
      >
      <!-- 组件内部添加组件需要插槽 slot="button"-->
        <van-button slot="button" type="primary" size="mini" style="padding:0 6px">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录 -->
    <div style="padding:20px">
      <van-button round block color="linear-gradient(to right, #4bb0ff, #6149f6)" size="small">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style>
</style>

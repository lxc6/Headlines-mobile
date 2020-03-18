<template>
  <div class="container">
    <!-- 导航 -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 登录布局 -->
    <van-cell-group style="margin-top:20px">
      <!-- 手机号 -->
      <!-- v-model  修饰符trim 自动去除空格 -->
      <van-field
        @blur="checkMobile"
        :error-message="errorMsg.mobile"
        v-model.trim="loginForm.mobile"
        label="手机号"
        placeholder="请输入手机号"
      ></van-field>
      <!-- 验证码 -->
      <!-- blur光标离开时触发 -->
      <van-field
        @blur="checkCode"
        :error-message="errorMsg.code"
        v-model.trim="loginForm.code"
        label="验证码"
        placeholder="请输入验证码"
        style="margin-top:10px"
      >
        <!-- 组件内部添加组件需要插槽 slot="button"-->
        <van-button slot="button" type="primary" size="mini" style="padding:0 6px">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录 -->
    <div style="padding:20px">
      <van-button
        @click="login"
        round
        block
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        size="small"
      >登录</van-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errorMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 效验手机号
    checkMobile () {
      // 第一轮 判空
      if (!this.loginForm.mobile) {
        this.errorMsg.mobile = '手机号不能为空'
        return false // 效验失败 无须向下执行
      }
      // 第二轮 正则
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMsg.mobile = '手机格式不正确'
        return false // 效验失败 无须向下执行
      }
      // 效验通过
      this.errorMsg.mobile = ''// 效验通过 不需消息提示
      return true
    },
    // 效验验证码
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMsg.code = '验证码格式错误'
        return false
      }
      this.errorMsg.code = ''
      return true
    },
    // 登录效验
    login () {
      const ckeckM = this.checkMobile()
      const checkC = this.checkCode()
      if (ckeckM && checkC) {
        console.log('验证通过')
        // 格式效验完成后 调用接口验证数据
      }
    }
  }
}
</script>

<style>
</style>

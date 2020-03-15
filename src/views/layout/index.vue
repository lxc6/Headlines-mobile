<template>
  <div class="container">
    <!-- 头部导航栏 -->
    <van-nav-bar fixed title="黑马头条" right-text="搜索" @click-right="$router.push('/search')"></van-nav-bar>
    <!-- 二级容器 -->
    <div class="my-wrapper">
      123131
      <router-view></router-view>
    </div>
    <!-- 底部标签栏 -->
    <!-- route 开启路由模式 -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="search">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  // 控制二级路由容器宽高
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>

<template>
  <div id="app">
    <!-- 一级路由容器 -->

    <keep-alive>
      <!-- 需要缓存时 只有home需要缓存-->
      <router-view v-if="$route.meta.isAlive"/>
    </keep-alive>
    <!-- 不需要缓存时 -->
    <router-view  v-if="!$route.meta.isAlive" />
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}

</script>
<style lang="less">

</style>

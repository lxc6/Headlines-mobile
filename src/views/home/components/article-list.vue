<template>
  <div class="scroll-wrapper">
      <van-list v-model="upLoading" :finished="finished" @load="onLoad"></van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 表示是否开启了上拉加载 默认值false
      finished: false, // 表示 是否已经完成所有数据的加载
      articles: []
    }
  },
  methods: {
    onLoad () {
      console.log('开始加载数据')
      setTimeout(() => {
        this.finished = true
        console.log('加载数据完成')
      }, 1000)
    },
    upLoad () {}
  }
}
</script>

<style>
</style>

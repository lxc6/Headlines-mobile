<template>
  <div class="more-action">
    <van-cell-group v-if="!isReport">
      <!-- 触发父级自定义事件 dislike-->
      <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <!-- 触发父级自定义事件 report-->
      <van-cell @click="$emit('report',item.value)"
       v-for="item in reports" :key="item.value">{{item.label}}</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { reports } from '@/api/constants'
import eventBus from '@/utils/eventBus'
export default {
  created () {
    eventBus.$on('delArticle', () => (this.isReport = false))
  },
  data () {
    return {
      isReport: false, // 状态是否举报
      reports
    }
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>

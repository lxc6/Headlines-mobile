<template>
  <div class="container">
    <!-- tab标签页 -->
    <van-tabs>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :channel_id="item.id"></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- 综合 -->
    <span class="bar_btn">
      <van-icon name="wap-nav" />
    </span>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import { getChannels } from '@/api/channels.js'
export default {
  components: {
    ArticleList
  },
  data () {
    return {
      channels: []
    }
  },
  methods: {
    async getChannels () {
      const res = await getChannels()
      this.channels = res.channels// 获取频道数据
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
      background: rgba(231, 11, 11, 0.1)
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>

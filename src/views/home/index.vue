<template>
  <div class="container">
    <!-- tab标签页 -->
    <!-- 默认绑定激活页签 -->
    <van-tabs v-model="activeIndex">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 父组件的自定义事件 -->
        <ArticleList @showAction="openAction" :channel_id="item.id"></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- 综合方块 -->
    <span class="bar_btn" @click="showChannelEdit=true">
      <van-icon name="wap-nav"></van-icon>
    </span>
    <!-- 2.频道编辑组件 -->
    <van-action-sheet :round="false" title="编辑频道" v-model="showChannelEdit">
      <!-- 父组件自定义属性 -->
        <Channeledit @selectChannel="selectChannel" :channels="channels"></Channeledit>
    </van-action-sheet>
    <!-- 1.文章弹层组件 -->
    <van-popup v-model="show" style="width:80%">
      <!-- 监听谁就在谁的标签上注册事件 dislike操作参数  $evnet为事件参数由子组件传过来 -->
      <MoreActions @dislike="dislikeOrReport('dislike')" @report="dislikeOrReport('report',$event)"></MoreActions>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import MoreActions from './components/more-actions'
import Channeledit from './components/channel-edit'
import { getChannels } from '@/api/channels.js'
import { dislikeArticles, reportArticles } from '@/api/article'
import eventBus from '@/utils/eventBus'
export default {
  components: {
    ArticleList, // 注册组件
    MoreActions,
    Channeledit
  },
  data () {
    return {
      channels: [],
      show: false, // 是否显示弹层
      artId: null,
      activeIndex: 0, // 当前默认激活的页签
      showChannelEdit: false // 是否显示频道编辑
    }
  },
  methods: {
    openAction (artId) {
      this.show = true // 方法实现弹层显示与隐藏
      this.artId = artId
    },
    // 操作参数operateType
    async dislikeOrReport (operateType, type) {
      try {
        operateType === 'dislike'
          ? await dislikeArticles({ target: this.artId })
          : await reportArticles({ target: this.artId, type }) // 发送请求  ?后端记录不再推送
        this.$lnotify({ type: 'success', message: '操作成功' })
        // 触发事件池 利用广播机制 通知tab 实现删除数据
        // activeIndex与channel的下标相对应 获取频道id
        eventBus.$emit(
          'delArticle',
          this.artId,
          this.channels[this.activeIndex].id
        ) // 广播001
        this.show = false // 关闭弹层
      } catch (error) {
        this.$lnotify({ message: '操作失败' }) // lnotify默认type类型为失败
      }
    },
    async getChannels () {
      const res = await getChannels()
      this.channels = res.channels // 获取频道数据
    },
    selectChannel (index) {
      this.activeIndex = index // 将对应频道的索引 设置给当前激活的 标签
      this.showChannelEdit = false// 关闭弹层
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
      background-color: rgba(245, 88, 237, 0.1);
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
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    // background: #3296fa;
    background: yellowgreen;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>

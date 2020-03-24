<template>
  <div class="comment">
    <!-- 用户进入文章详情就加载 评论数据 @load -->
    <van-list
      @load="onLoad"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <div
        class="item van-hairline--bottom van-hairline--top"
        v-for="item in comments"
        :key="item.com_id.toString()"
      >
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="item.aut_photo"
        />
        <div class="info">
          <p>
            <span class="name">{{ item.aut_name }}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{ item.like_count }}</span>
            </span>
          </p>
          <p>{{ item.content }}</p>
          <p>
            <span class="time">{{ item.pubdate | relTime }}</span
            >&nbsp;
            <van-tag plain @click="openReply(item.com_id.toString())"
              >{{ item.reply_count }} 回复</van-tag
            >
          </p>
        </div>
      </div>
    </van-list>
    <!-- 发表评论 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <van-loading
          v-if="submiting"
          slot="button"
          type="spinner"
          size="16px"
        ></van-loading>
        <span class="submit" v-else slot="button">提交</span>
      </van-field>
    </div>
    <!-- 评论回复模块 -->
    <van-action-sheet
      v-model="showReply"
      :round="false"
      class="reply_dialog"
      title="回复评论"
    >
      <van-list
        @load="onPeply"
        v-model="reply.loading"
        :finished="reply.finished"
        finished-text="没有更多了"
      >
        <div
          class="item van-hairline--bottom van-hairline--top"
          v-for="item in reply.list"
          :key="item.com_id.toString()"
        >
          <van-image
            round
            width="1rem"
            height="1rem"
            fit="fill"
            :src="item.aut_photo"
          />
          <div class="info">
            <p>
              <span class="name">{{item.aut_name}}</span>
            </p>
            <p>{{item.content}}</p>
            <p>
              <span class="time">{{item.pubdate|relTime}}</span>
            </p>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
  </div>

  <!-- 都不输入框 -->
</template>

<script>
import { getComments } from '@/api/article.js'
export default {
  data () {
    return {
      // --评论
      loading: false, // 上拉加载中
      finished: false, // 全部加载完毕
      value: '', // 输入的内容
      submiting: false, // 控制提交中状态数据
      comments: [], // 评论列表
      offset: null, // 分页依据 为空 表示从第一页开始
      // --评论回复
      showReply: false,

      reply: {
        // 此对象专门放置 面板加载信息
        commentId: null, // 存放当前点击的评论id
        loading: false, // 评论回复的加载状态
        finished: false, // 评论回复是否加载完毕
        offset: null, // 偏移量 作为评论回复分页加载的时候 查询的依据
        list: [] // 存放 评论回复的数据
      }
    }
  },
  methods: {
    //  评论数据
    async onLoad () {
      const { artId } = this.$route.query
      const data = await getComments({
        type: 'a', // a(文章的评论)   c(评论的评论)
        source: artId,
        offset: this.offset// 赋值当前偏移量
      })
      this.comments.push(...data.results)// 向后追加数据
      this.loading = false // 关闭正在上拉加载的状态
      this.finished = data.end_id === data.last_id // 判断为最后一页时执行
      if (!this.finished) { // 非最后一页
        this.offset = data.last_id// 将当前最后id赋值给偏移用于加载下一页
      }
    },
    // 开启评论回复
    openReply (commentId) {
      this.showReply = true// 开启评论回复弹窗
      this.reply.commentId = commentId// 当前评论id
      // 清空原有数据
      this.reply.loading = false // 评论回复的加载状态
      this.reply.finished = false // 评论回复是否加载完毕
      this.reply.offset = null // 偏移量 作为评论回复分页加载的时候 查询的依据
      this.reply.list = [] // 数据列表
    },
    // 评论回复数据
    async onPeply () {
      const data = await getComments({
        type: 'c', // a(文章的评论)   c(评论的评论)
        source: this.reply.commentId, // 获取谁的评论id进行回复
        offset: this.reply.offset// 赋值当前偏移量
      })
      this.reply.list.push(...data.results)// 向后追加数据
      this.reply.loading = false // 关闭正在上拉加载的状态
      this.reply.finished = data.end_id === data.last_id // 判断为最后一页时执行
      if (!this.reply.finished) { // 非最后一页
        this.reply.offset = data.last_id// 将当前最后id赋值给偏移用于加载下一页
      }
    }

  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name {
        color: #069;
      }
      .zan {
        vertical-align: middle;
        padding-right: 2px;
      }
      .count {
        vertical-align: middle;
        font-size: 10px;
        color: #666;
      }
      .time {
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  border-top: 1px dashed #eee;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    padding: 8px 15px;
    color: #3296fa;
    color: snow;
    background-color: #3296fa;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
}
.reply_dialog {
  height: 100%;
  max-height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  .van-action-sheet__content {
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 44px;
  }
}
</style>

<template>
  <div class="container">
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <div class="detail">
      <!-- 标题 -->
      <h3 class="title">{{ articles.title }}</h3>
      <!-- 头像 -->
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="articles.aut_photo" />
        <div class="text">
          <p class="name">{{ articles.aut_name }}</p>
          <p class="time">{{ articles.pubdate | relTime }}</p>
        </div>
        <!-- 关注 -->
        <!-- 交互效果 loading 加载状态 -->
        <van-button :loading="followLoading" @click="follow" round size="small" type="info">
          {{
          articles.is_followed ? "已关注" : "+ 关注"
          }}
        </van-button>
      </div>
      <!-- 内容 -->
      <div class="content" v-html="articles.content">
        <!-- 文章内容 有标签 有属性 有样式 将标签设置到对应的元素中 v-html -->
        <!-- <p>{{ articles.content }}</p> -->
      </div>
      <!-- 点赞 -->
      <div class="zan">
        <van-button
          round
          size="small"
          :class="{ active: articles.attitude === 1 }"
          plain
          icon="like-o"
        >点赞</van-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          :class="{ active: articles.attitude === 0 }"
          plain
          icon="delete"
        >不喜欢</van-button>
      </div>
      <!-- 放置comment组件 到 detail内部 因为有padding-->
      <Comment />
    </div>

    <!-- 放置一个遮罩层 -->
    <van-overlay :show="loading">
      <!-- 加载进度条 -->
      <div class="loading-container">
        <van-loading />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Comment from './components/comment'
import { getArticleInfo } from '@/api/article'
import { followUser, unfollowUser } from '@/api/user'
export default {
  components: {
    Comment
  },
  data () {
    return {
      articles: {},
      loading: false,
      followLoading: false // 是否正在点击关注
    }
  },
  methods: {
    // 获取文章详情
    async getArticleInfo () {
      this.loading = true
      const { artId } = this.$route.query // 解构查询id
      this.articles = await getArticleInfo(artId) // 获取数据
      this.loading = false
    },
    // 关注与取消关注
    async follow () {
      try {
        this.followLoading = true
        if (this.articles.is_followed) {
          // 取消关注
          await unfollowUser(this.articles.aut_id)
        } else {
          // 关注
          await followUser({ target: this.articles.aut_id })
        }
        // 移动端 成功改变状态 pc端重新加载
        this.articles.is_followed = !this.articles.is_followed
      } catch (error) {
        this.$lnotify({ message: '操作失败' })
      } finally {
        //  不论你写的执行 是成功的还是失败的  不论是走 try  catch 最终都会进入 finally
        this.followLoading = false // 关闭加载状态
      }
    }
  },
  created () {
    this.getArticleInfo()
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.van-overlay {
  background: none;
}
.detail {
  padding: 46px 10px 44px;
  .title {
    font-size: 18px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 10px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    position: sticky;
    background-color: #fff;
    top: 46px;
    z-index: 2;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 20px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>

<template>
    <div class='container'>
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <div class="detail">
      <h3 class="title">{{articles.title}}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="articles.aut_photo" />
        <div class="text">
          <p class="name">{{articles.aut_name}}</p>
          <p class="time">{{articles.pubdate|relTime}}</p>
        </div>
        <van-button round size="small" type="info">+ 关注</van-button>
      </div>
      <div class="content">
        <p>{{articles.content}}</p>
      </div>
      <div class="zan">
        <van-button round size="small" :class="{active:articles.attitude===1}" plain icon="like-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" :class="{active:articles.attitude===0}" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api/article'
export default {
  data () {
    return {
      articles: {}

    }
  },
  methods: {
    async getArticleInfo () {
      const { artId } = this.$route.query// 解构查询id
      this.articles = await getArticleInfo(artId)// 获取数据
    }
  },
  created () {
    // console.log(this.articles)
    this.getArticleInfo()
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  padding: 46px 10px 44px;
  .title {
    font-size: 18px;
    line-height: 2;
  }
  .zan{
    text-align: center;
    padding: 10px 0;
    .active{
      border-color:red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    position:sticky;
    background-color: #fff;
    top:46px;
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
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
    /deep/ code{
      white-space: pre-wrap;
    }
  }
}
</style>

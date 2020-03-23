<template>
  <div class="container">
    <!-- 导航 显示返回箭头-->
    <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 搜索结果列表 -->
    <van-list v-model="uploading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell-group>
        <!-- 放置搜索结果列表 实现上拉加载  注意id大数字问题-->
        <van-cell v-for="item in articles" :key="item.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{item.title}}</h3>
            <div class="img_box" v-if="item.cover.type===3">
              <van-image class="w33" fit="cover" :src="item.cover.images[0]" />
              <van-image class="w33" fit="cover" :src="item.cover.images[1]" />
              <van-image class="w33" fit="cover" :src="item.cover.images[2]" />
            </div>
            <div class="img_box" v-if="item.cover.type===1">
              <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <!-- 发布时间 过滤器处理相对时间-->
              <span>{{item.pubdate|relTime}}</span>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
// import { searchArticle } from '@/api/article'
import * as Articles from '@/api/article'
export default {
  data () {
    return {
      uploading: false,
      finished: false,
      articles: [],
      pages: {
        page: 1,
        per_page: 10
      }
    }
  },
  methods: {
    async onLoad () {
      const { q } = this.$route.query// 解构获取query参数
      const data = await Articles.searchArticle({ ...this.pages, q })// 传入参数发送请求获取数据
      this.articles.push(...data.results)// 上拉加载触发时,将数据追到队尾
      this.uploading = false// 关闭上拉加载
      if (data.results.length) { // 返回的结果不为0时
        this.pages.page++// 如果有下一页 应该把页码切到下一页
      } else {
        this.finished = true// 没有数据 全部加载完成
      }
    }
  },
  created () {}
}
</script>

<style lang='less' scoped>
.container {
  padding-top: 46px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      height: 180px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 10px;
    }
  }
}
</style>

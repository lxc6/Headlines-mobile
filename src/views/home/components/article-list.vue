<template>
  <div class="scroll-wrapper">
    <!-- 下拉㕞新  㕞新是对整个列表进行刷新所以要包裹list-->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="successText">
      <!-- 上拉加载 -->
      <van-list finished-text="没有了" v-model="upLoading" :finished="finished" @load="onLoad">
        <!-- 循环内容 -->
        <van-cell-group>
          <van-cell v-for="item in articles" :key="item.art_id.toString()" >
             <!-- 放置元素 文章列表的循环项  无图  单图  三图 -->
            <div class="article_item">
              <!-- 标题 -->
              <h3 class="van-ellipsis">{{ item.title }}</h3>
              <!-- 根据当前的封面类型决定显示单图 三图 还是无图 -->
              <!-- 三图图片 -->
              <div class="img_box" v-if="item.cover.type === 3">
                <!-- 图片组件用的是 vant的组件库中的图片组件 需要使用该组件 进行图片的懒加载 -->
                <!-- lazy-load属性实现懒加载 -->
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <!-- 单图 暂时隐藏掉单图-->
               <div class="img_box" v-if="item.cover.type === 1">
                 <!-- 单图取第一个 -->
                <van-image lazy-load class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>
              <!-- 作者信息 -->
              <div class="info_box">
                <span>{{ item.aut_name }}</span>
                <span>{{ item.comm_count }}评论</span>
                <span>{{ item.pubdate | relTime }}</span>
                <!-- 判断未登陆时按钮不存在 -->
                <span class="close" v-if="user.token">
                  <van-icon name="cross"></van-icon>
                </span>
              </div>
            </div>

          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])// 映射出state中的user用于判断有无  × 按钮
  },
  props: { // 父子传值
    channel_id: {
      required: true,
      type: Number,
      default: null
    }
  },
  data () {
    return {
      downLoading: false, // 是否处于开启了下拉刷新
      finished: false, // 表示 是否已经完成所有数据的加载
      upLoading: false, // 表示是否开启了上拉加载 默认值false
      successText: '', // 刷新成功时显示文本
      timestamp: null, // 定义一个时间戳属性 用来存储 历史时间戳
      articles: []
    }
  },
  methods: {
    // 上拉加载
    async onLoad () {
      console.log('开始加载文章列表数据')
      await this.$sleep(800)// 认为设置 延迟加载 await 等待执行
      // this.timestamp || Date.now()  如果有历史时间戳 用历史时间戳 否则用当前的时间戳
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now()
      })
      // console.log(data)
      this.articles.push(...data.results)// 获取数据 追加到队尾
      this.upLoading = false// 关闭加载状态 滚动条与底部距离小于 offset 时触发load事件
      if (data.pre_timestamp) { // 将历史时间戳传给 timestamp
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true// 历史时间戳为零时没有数据了
      }
    },
    // 下拉㕞新
    async onRefresh () {
      console.log('开始㕞新文章列表数据')
      await this.$sleep(800)// 延迟㕞新
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: Date.now()
      })
      // console.log(data)
      this.downLoading = false // 关闭刷新
      if (data.results.length) {
        // this.articles.unshift(...data.results)
        this.articles = data.results// 替换所有数据而非向前添加数据
        if (data.pre_timestamp) { // 将历史时间戳传给 timestamp
          this.timestamp = data.pre_timestamp
          this.finished = false// 从新打开数据可实现下拉加载
        }
        this.successText = `更新了${data.results.length}条数据`
      } else {
        this.successText = '当前为最新数据'
      }
    }
  }
}
</script>

<style lang='less' scoped>
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
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 3px;
        line-height: 12px;
        height: 10px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>

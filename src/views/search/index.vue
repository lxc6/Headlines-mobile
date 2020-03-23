<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <!-- 完成绑定  加tirm修饰符-->
    <van-search @search="onSearch" v-model.trim="q" placeholder="请输入搜索关键词" shape="round" />
    <!-- 联想 根据情况判断隐藏与展示 当输入时联想 没有输入时历史-->
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell @click="toResult(item)" v-for="(item,index) in suggestList" :key="index" icon="search">
        {{item}}
      </van-cell>
    </van-cell-group>
      <!-- 历史 -->
    <div class="history-box" v-else>
      <div class="head" v-if="historyList.length">
        <span>历史记录</span>
        <van-icon @click="clear" name="delete"></van-icon>
      </div>
      <van-cell-group>
        <!-- 点击历史实现跳转 -->
        <van-cell @click="toResult(item)" v-for="(item,index) in historyList" :key="index">
          <a class="word_btn">{{item}}</a>
          <!-- stop阻止事件冒泡 -->
          <van-icon @click.stop="delHistory(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'// 弹出框提示删除与否
import { getSuggestion } from '@/api/article'
const key = 'hm-94-toutiao-history' // 此key用来作为 历史记录在本地缓存中的key
export default {
  name: 'search',
  data () {
    return {
      q: '',
      // historyList: [],
      historyList: JSON.parse(localStorage.getItem(key) || '[]'),
      suggestList: []// 联想搜索列表

    }
  },
  watch: {
    // watch监听data中q的状态
    async q () {
      // 时间戳实现节流
      this.timer = this.timer || 0
      const currDate = Date.now()
      if (currDate - this.timer >= 500) {
        if (!this.q) {
          // 如果这时 搜索关键字没有内容
          this.suggestList = []
          // 不能再继续了
          return
        }
        const data = await getSuggestion({ q: this.q })
        this.suggestList = data.options
        this.timer = currDate// 本次结束进入下一次计时
      }
    }
  },
  methods: {
    // 删除历史记录
    async delHistory (index) {
      try {
        await Dialog.confirm({
          title: '删除历史',
          message: '您确定要删除该条历史记录吗？'
        })
        this.historyList.splice(index, 1)// 直接删除数据
        localStorage.setItem(key, JSON.stringify(this.historyList))// 存入缓存
      } catch (error) {

      }
    },
    // 跳转到搜索结果
    toResult (text) {
      this.historyList.push(text)// 添加历史
      this.historyList = Array.from(new Set(this.historyList))// 去重
      localStorage.setItem(key, JSON.stringify(this.historyList))// 添加缓存
      // ----通用跳转-----
      this.$router.push({ path: '/search/result', query: { q: text } })
    },
    onSearch () {
      if (!this.q) return
      this.historyList.push(this.q)// 添加历史
      this.historyList = Array.from(new Set(this.historyList))// 去重
      localStorage.setItem(key, JSON.stringify(this.historyList))// 添加缓存
      this.$router.push({ path: '/search/result', query: { q: this.q } })
    },
    // 清空操作
    async clear () {
      try {
        await Dialog.confirm({
          title: '清空',
          message: '您确定要删除所有历史记录吗？'
        })
        this.historyList = []
        localStorage.setItem(key, '[]')// 存入缓存
      } catch (error) {

      }
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>

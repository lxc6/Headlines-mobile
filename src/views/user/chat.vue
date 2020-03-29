<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <!-- 消息列表 -->
    <div class="chat-list" ref="myList">
      <!-- 消息 -->
      <div v-for="(item,index) in list" :key="index"
      class="chat-item " :class="{left:item.name==='xz',right:item.name!=='xz'}">
        <van-image v-if="item.name==='xz'" fit="cover" round :src="XZImg" />
          <!-- 内容 -->
        <div class="chat-pao">{{item.msg}}</div>
        <van-image v-if="item.name!=='xz'" fit="cover" round :src="photo" />
      </div>
    </div>
    <!-- 发送 -->
    <div class="reply-container van-hairline--top">
      <!-- 发送消息 -->
      <van-field v-model="value" placeholder="说点什么...">
        <van-loading v-if="loading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import XZImg from '@/assets/image/333.jpg'
import { mapState } from 'vuex'
import io from 'socket.io-client'// 引入通讯组件
export default {
  computed: {
    ...mapState(['photo', 'user']) // 映射vuex中的公共变量
  },
  created () {
    // 初始化连接通讯    // 固定写法 它会拼接到 url地址上 ?后面
    this.socket = io('http://ttapi.research.itcast.cn', { query: { token: this.user.token } })
    // connect 是固定的写法 意思是表示当前已经建立连接成功
    this.socket.on('connect', () => {
      this.list.push({ msg: '你好老大', name: 'xz' })
    })
    // 监听回复消息
    this.socket.on('message', data => {
      this.list.push({ ...data, name: 'xz' })
      this.scrollBottom() // 发送消息和接收消息后都要滚动到底部
    })
  },
  // 实例销毁前
  beforeDestroy () {
    // 需要在实例销毁之前  把websocket连接给关掉
    // ws.close() 原生    socket.io  close()
    this.socket.close() // 直接关闭连接
  },
  data () {
    return {
      value: '',
      loading: false,
      XZImg,
      // 聊天记录
      list: []
    }
  },
  methods: {
    scrollBottom () {
      // nextTick函数会在 上一次数据更新 并且完成页面渲染之后执行
      Vue.nextTick(() => { // 组件实例 也可用this
        this.$refs.myList.scrollTop = this.$refs.myList.scrollHeight
      })
    },
    // 发消息
    async send () {
      if (!this.value) return false
      this.loading = true // 打开状态的目的是 放置重复提交
      await this.$sleep(500) // 强制休眠
      const obj = {
        msg: this.value,
        timestamp: Date.now()
      }
      this.socket.emit('message', obj)// 发消息
      this.list.push(obj)
      this.value = ''
      this.loading = false
      this.scrollBottom()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}

</style>

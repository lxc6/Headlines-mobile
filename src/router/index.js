import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 按需加载配置路由
const Layout = () => import('@/views/layout')// 布局组件 一级路由
const Home = () => import('@/views/home')// 首页组件 二级路由
const Question = () => import('@/views/question')// 问答组件 二级路由
const Video = () => import('@/views/video')// 视频组件 二级路由
const User = () => import('@/views/user')// 用户组件 二级路由
// 其他一级路由
const Chat = () => import('@/views/user/chat')
const Profile = () => import('@/views/user/profile')
const Article = () => import('@/views/article')
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchResult = () => import('@/views/search/result')

const routes = [
  {
    path: '/',
    component: Layout, // 布局组件 一级路由
    children: [{
      path: '', // 如果path什么都不写 默认就是二级路由的默认组件
      component: Home,
      // meta 属性 是route信息里面的一个属性 我们可以在这里存放一些数据 在路由切换的时候使用
      meta: { // 通过这个标记 来决定 是否 采用 keep-alive来包裹 我们的一级路由容器
        isAlive: true // 是否缓存组件实例
      }
    }, {
      path: '/question',
      component: Question
    }, {
      path: '/video',
      component: Video
    }, {
      path: '/user',
      component: User
    }]
  },
  // 其他一级路由
  {
    path: '/article',
    component: Article
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/result',
    component: SearchResult
  },
  {
    path: '/user/chat',
    component: Chat
  },
  {
    path: '/user/profile',
    component: Profile
  }

]

const router = new VueRouter({
  routes
})

export default router

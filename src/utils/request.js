/****
 * 统一处理axios请求拦截
 * create lixc  2020-03-16
 * ***/
import router from '@/router'
import store from '@/store'// 引入store实例  store 相当于 this.$store
import axios from 'axios'
import JSONbig from 'json-bigint'
const instance = axios.create({
  // 构造参数
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 请求地址常量
  transformResponse: [data => data ? JSONbig.parse(data) : {}]// 大数字处理
})
// 请求拦截
instance.interceptors.request.use(config => {
  // config就是请求的参数 统一注入token
  store.state.user.token && (config.headers.Authorization = `Bearer ${store.state.user.token}`)
  return config // 返回配置
}, error => Promise.reject(error))
// 响应拦截
instance.interceptors.response.use(res => {
  // 脱壳处理
  try {
    return res.data.data
  } catch (error) {
    return res.data
  }
}, async error => {
  // 带查询参数，变成 /login?redirectURL= (router.currentRoute.path登录页要跳转的地址)
  const path = { path: '/login', query: { redirectURL: router.currentRoute.path } }
  // 401----token失效
  if (error.response && error.response.status === 401) {
    //  判断有续命药token 14天
    if (store.state.user.refresh_token) {
      try {
        const res = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        // 获取到token 提交mutations 更新vuex状态 更新本地缓存token
        store.commit('updataUser', {
          user: {
            token: res.data.data.token,
            refresh_token: store.state.user.refresh_token
          }
        })
        return instance(error.config)// 把刚才错误的请求再次发送出去 目的 继续执行这个请求执行链下面的内容
      } catch (error) {
        // 补救措施无用时 清空token 跳转登录页
        store.commit('delUser')
        router.push(path)
      }
    } else {
      // 没有延期token时 清空token 跳转登录
      store.commit('delUser')
      router.push(path)
    }
  }
  return Promise.reject(error)// 返回执行链的 catch 直接返回失败
})
export default instance

import store from '@/store'
/**
 * 获取我的频道API
 */
import request from '@/utils/request'
const CACHE_CHANNEL_V = 'hm-94-toutiao-v'// 登录用户的key
const CACHE_CHANNEL_T = 'hm-94-toutiao-t'// 登录用户的key
// 获取我的频道 匿名用户也可以获取
export function getMyChannels () {
  return new Promise((resolve, reject) => {
    // 本地缓存 根据token 判断 信息存储名
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    const str = localStorage.getItem(key)// 获取数据
    if (str) {
      resolve({ channels: JSON.parse(str) })// 存在数据返回数据 结构与请求中的结构一直
    } else {
      request({ url: '/user/channels' }).then(res => {
        localStorage.setItem(key, JSON.stringify(res.channels))// 不存在数据线上拉取存储再返回
        resolve(res)
      })
    }
  })
}
/****
 *  删除频道API
 * @params  id 作为删除频道的依据
 * ****/
export function delChannels (id) {
  return new Promise((resolve, reject) => {
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    const channels = JSON.parse(localStorage.getItem(key))
    const index = channels.findIndex(item => item.id === id)
    if (index > -1) {
      channels.splice(index, 1)// 删除数据
      localStorage.setItem(key, JSON.stringify(channels))// 存入缓存
      resolve()// 成功执行
    } else {
      reject(new Error('没有找到对应的频道..'))
    }
  })
}
/*****
 * 添加频道的方法
 * @params  channel  是 { id: 1, name: 'c++' }
 * *****/
export function addChannels (channel) {
  return new Promise((resolve, reject) => {
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    const channels = JSON.parse(localStorage.getItem(key))
    channels.push(channel)// 添加队尾
    localStorage.setItem(key, JSON.stringify(channels))// 存入缓存
    resolve()// 执行成功
  })
}
// 获取所有频道API
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}

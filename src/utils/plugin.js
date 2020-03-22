/***
 *plugin.js 专门负责提供小函数 以及vue中常用的过滤器
 * create by lixc 2020-03-18
 * ***/
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'// 语言插件
import relativeTime from 'dayjs/plugin/relativeTime'// 相对时间插件
dayjs.extend(relativeTime)// dayjs的相对时间插件扩展
export default { // 导出一个默认对象
  // 在main中Vue.use()注册使用
  install (Vue) {
    Vue.prototype.$lnotify = (params) => Vue.prototype.$notify({ duration: 1000, ...params })
    Vue.prototype.$sleep = sleep
    // 封装成过滤器
    Vue.filter('relTime', relTime)// 全局过滤器
  }
}
function sleep (time = 500) {
  return new Promise(function (resolve, reject) {
    // 延迟 成功执行resolve() 失败reject()
    setTimeout(() => resolve(), time)
  })
}
function relTime (data) {
  return dayjs().locale('zh-cn').from(data)
}

/***
 *plugin.js 专门负责提供小函数 以及vue中常用的过滤器
 * create by lixc 2020-03-18
 * ***/
export default { // 导出一个默认对象
  // 在main中Vue.use()注册使用
  install (Vue) {
    Vue.prototype.$lnotify = (params) => Vue.prototype.$notify({ duration: 1000, ...params })
  }
}

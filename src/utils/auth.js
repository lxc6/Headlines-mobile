/*****
 *  auth.js 专门处理 token的读写和删除
 *  create by lixc 2020/3/15
 * *****/
const USER_TOKEN = 'headlines-mobile'// 存储用户信息
// 设置token
export function setUser (user) {
  // user应该是一个对象 包含token和refresh token 要将user转换为字符串
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 获取token
export function getUser () {
  // 返回为对象类型
  // user为空报错  需要短路表达式 为空时返回空对象
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || {})
}
// 删除token
export function delUser () {
  window.localStorage.removeItem(USER_TOKEN)
}

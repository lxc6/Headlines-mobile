/***
 *  处理用户相关请求
 *  create by lixc 2020-03-18
 * ****/
import request from '@/utils/request'
// 导出登录方法
export function login (data) {
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })// 返回一个promise对象
}
/**
 * 关注用户
 */
export function followUser (data) {
  return request({
    url: '/user/followings',
    method: 'post',
    data
  })
}
/**
 * 取消关注用户
 */
export function unfollowUser (autid) {
  return request({
    url: `/user/followings/${autid}`,
    method: 'delete'
  })
}

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
/***
 * 获取用户自己的个人信息
 * ***/

export function getUserInfo () {
  return request({
    url: '/user'
  })
}
/****
 * 获取用户的个人资料
 * ***/
export function getUserProfile () {
  return request({
    url: '/user/profile'
  })
}
/****
 * 修改用户头像
 * ****/
export function updatePhoto (data) {
  return request({
    url: '/user/photo',
    method: 'patch',
    data // body参数
  })
}

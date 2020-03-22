/**
 * 获取主页频道
 * create by lixc 2020-03-19
 */
import request from '@/utils/request'
// 获取用户频道
export function getChannels () {
  return request({
    url: '/user/channels'
  })
}
// 获取所有频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}

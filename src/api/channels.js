/**
 * 获取主页频道
 * create by lixc 2020-03-19
 */
import request from '@/utils/request'
export function getChannels () {
  return request({
    url: '/user/channels'
  })
}

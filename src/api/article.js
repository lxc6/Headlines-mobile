/**
 * 处理文章列表请求
 *create by lixc 2020-03-19
 */
import request from '@/utils/request'
/**
 * 获取文章列表
 * */
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params } // 合并数据
  })
}
/**
 *不喜欢的文章
 * */

export function dislikeArticles (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}
/**
 *举报文章
 * */
export function reportArticles (data) {
  return request({
    url: '/article/reports',
    method: 'post',
    data
  })
}

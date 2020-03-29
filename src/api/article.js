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
/*****
 * 获取联想搜索建议
 * ***/
export function getSuggestion (params) {
  return request({
    url: '/suggestion', // 搜搜建议地址
    params // query参数放置在 params中
  })
}
/**
 * 搜索文章API
 */
export function searchArticle (params) {
  return request({
    url: '/search',
    params
  })
}
/**
 * 获取文章详情API
 */
export function getArticleInfo (artId) {
  return request({
    url: `/articles/${artId}`
  })
}
/**
 * 获取评论或者评论回复API
 */
export function getComments (params) {
  return request({
    url: '/comments',
    params // type(是文章的的回复还是回复的回复)  source(来源id)  offset(偏移量 分页依据)
  })
}
/**
 * 添加评论或者评论回复API
 */
export function commentsOrReply (data) {
  return request({
    url: '/comments',
    method: 'post',
    data // (target评论所属目标id --(content评论内容 --  (art_id文章id
  })
}

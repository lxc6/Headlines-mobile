// 导航守卫
import router from '@/router'
import store from '@/store'
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    next({
      path: '/login',
      query: { redirectURL: to.fullPath }// fullPath 会带 ?后面的参数 是一个完整的路径
    })
  } else {
    next()
  }
})

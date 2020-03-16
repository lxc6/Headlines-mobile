import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser()
  },
  mutations: {
    updataUser (state, payload) {
      state.user = payload.user// 更新数据
      auth.setUser(payload.user)// 数据同步到本地存储
    },
    clearUser (state) {
      state.user = {} // 清空数据
      auth.delUser()// 清除缓存数据
    }
  },
  actions: {
  },
  modules: {
  }
})

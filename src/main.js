import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.config.productionTip = false
Vue.use(Vant)// 注册vant 完整导入 优化时可按需导入{button} Vue.use(button)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

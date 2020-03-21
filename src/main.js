import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import Plugin from '@/utils/plugin'
import 'vant/lib/index.less'// 修改某些变量 要引入less而非css
import 'amfe-flexible'
import '@/styles/index.less'
import '@/permission/index'
Vue.use(Vant)// 注册vant 完整导入 优化时可按需导入import {button} from'xxx'----- Vue.use(button)
Vue.use(Plugin)// 需等vant注册完成之后注册
Vue.use(Lazyload)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

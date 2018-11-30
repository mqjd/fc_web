import Vue from 'vue'

import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import './app.scss'
import App from './App'
import router from './router'
import store from './model/store'
import ElementUI from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
Vue.use(ElementUI)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

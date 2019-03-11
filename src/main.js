import Vue from 'vue'

import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import './app.scss'
import App from './App'
import store from './model/store'
import ElementUI from 'element-ui'
import qs from 'qs'
import axios from 'axios'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import router from './router'
import './perm'

axios.defaults.baseURL = '/api/'
axios.defaults.transformRequest = [function (data) {
  return qs.stringify(data, { indices: false })
}]
Vue.prototype.$http = axios

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.config.productionTip = false
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created: function () {
    this.bind()
  },
  methods: {
    bind () {
      const me = this
      axios.interceptors.request.use(me.axiosInterceptorBefore, me.axiosInterceptorAfter)
      axios.interceptors.response.use(me.axiosInterceptorBefore, me.axiosInterceptorAfter)
    },
    axiosInterceptorBefore (config) {
      // this.$store.dispatch('increment')
      return config
    },
    axiosInterceptorAfter (error) {
      if (error.response.status === 500) {
        var errorData = error.response.data
        // this.$store.dispatch('increment')
        this.$message({
          showClose: true,
          message: '错误信息：' + errorData.message + ' 错误代码：' + errorData.code,
          type: 'error'
        })
      } else {
        this.$message({
          showClose: true,
          message: '错误信息：' + error.response.statusText + ' 错误代码：' + error.response.status,
          type: 'error'
        })
      }
      return Promise.reject(error)
    }
  }
})

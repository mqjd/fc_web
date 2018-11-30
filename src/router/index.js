import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
Vue.use(Router)

export const RouterMap = [{
  path: '/redirect',
  component: Main,
  hidden: true,
  children: [
    {
      path: '/redirect/:path*',
      component: () => import('@/pages/redirect')
    }
  ]
}, {
  path: '/',
  name: 'main',
  meta: { title: '主页', icon: 'fc-icon-home' },
  component: Main
}, {
  path: '/login',
  name: 'login',
  meta: { title: '登陆', icon: 'fc-icon-user' },
  component: () => import('@/pages/login')
}, {
  path: '/',
  name: 'flow',
  meta: { title: '流程管理', icon: 'fc-icon-deploymentunit' },
  component: Main,
  children: [{
    path: 'flowdesign',
    name: 'flowdesign',
    meta: { title: '流程设计', icon: 'fc-icon-gateway' },
    component: () => import('@/pages/flowdesign')
  },
  {
    path: 'form',
    name: 'form',
    meta: { title: '普通表单', icon: 'fc-icon-table' },
    component: () => import('@/components/d-form')
  },
  {
    path: 'rform',
    name: 'rform',
    meta: { title: '富文本表单', icon: 'fc-icon-file-text' },
    component: () => import('@/components/r-form')
  }]
}]

export default new Router({
  routes: RouterMap
})

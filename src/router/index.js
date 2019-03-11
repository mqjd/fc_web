import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
Vue.use(Router)

export const RouterMap = [{
  path: '/redirect',
  component: Main,
  name: 'redirect',
  hidden: true,
  meta: {
    cache: false,
    tab: false
  },
  children: [
    {
      path: '/redirect/:path*',
      component: () => import('@/pages/redirect')
    }
  ]
}, {
  path: '/',
  name: 'main',
  meta: {
    title: '主页',
    icon: 'fc-icon-home',
    cache: false,
    tab: false
  },
  component: Main
}, {
  path: '/login',
  name: 'login',
  hidden: true,
  meta: {
    title: '登陆',
    icon: 'fc-icon-user'
  },
  component: () => import('@/pages/login')
}, {
  path: '/component',
  name: 'component',
  meta: { title: '基础组件', icon: 'fc-icon-appstore' },
  component: Main,
  children: [{
    path: 'xTable',
    name: 'x-table',
    meta: { title: '表格', icon: 'fc-icon-table' },
    component: () => import('@/components/x-table')
  }, {
    path: 'cEditor',
    name: 'cEditor',
    meta: { title: '代码编辑', icon: 'fc-icon-code' },
    component: () => import('@/components/c-editor')
  }]
}, {
  path: '/sys',
  name: 'sys',
  meta: { title: '系统配置', icon: 'fc-icon-setting' },
  component: Main,
  children: [{
    path: 'DeptManage',
    name: 'DeptManage',
    meta: { title: '科室管理', icon: 'fc-icon-cluster' },
    component: () => import('@/pages/DeptManage')
  }]
}, {
  path: '/flow',
  name: 'flow',
  meta: { title: '流程管理', icon: 'fc-icon-deploymentunit' },
  component: Main,
  children: [{
    path: 'flowDesign',
    name: 'flowDesign',
    meta: { title: '流程管理', icon: 'fc-icon-gateway' },
    component: () => import('@/pages/flowDesign')
  },
  {
    path: 'DForm',
    name: 'DForm',
    meta: { title: '表单管理', icon: 'fc-icon-table' },
    component: () => import('@/components/d-form')
  },
  {
    path: 'RForm',
    name: 'r-form',
    meta: {
      title: 'tinymce',
      icon: 'fc-icon-file-text',
      cache: false
    },
    component: () => import('@/components/r-form')
  },
  {
    path: 'XForm',
    name: 'x-form',
    meta: {
      title: 'tui.editor',
      icon: 'fc-icon-file-text'
    },
    component: () => import('@/components/x-form')
  },
  {
    path: 'MForm',
    name: 'm-form',
    meta: {
      title: 'markdown',
      icon: 'fc-icon-file-text'
    },
    component: () => import('@/components/m-form')
  },
  {
    path: 'calendar',
    name: 'calendar',
    meta: {
      title: 'calendar',
      icon: 'fc-icon-file-text'
    },
    component: () => import('@/components/calendar')
  }]
}]

export default new Router({
  routes: RouterMap
})

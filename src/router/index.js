import Vue from 'vue'
import Router from 'vue-router'
import DForm from '@/components/d-form/d-form'
import DProcdef from '@/components/d-procdef/d-procdef'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DProcdef',
      component: DProcdef
    },
    {
      path: '/form',
      name: 'DProcdef',
      component: DForm
    }
  ]
})

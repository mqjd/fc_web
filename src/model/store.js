import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import pageperm from './modules/pageperm'
import main from './modules/main'
import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pageperm,
    main,
    login
  },
  getters
})

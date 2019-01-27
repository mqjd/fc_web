const model = {
  state: {
    tags: {
      visitedPages: [],
      cachedPages: []
    },
    sidemenu: {
      collapse: false
    }
  },
  mutations: {
    ADD_VISITED_PAGE: (state, page) => {
      if (state.tags.visitedPages.some(v => v.path === page.path)) return
      state.tags.visitedPages.push(
        Object.assign({}, page, {
          name: page.name || 'no-name'
        })
      )
    },
    ADD_CACHED_PAGE: (state, page) => {
      if (state.tags.cachedPages.includes(page.name)) return
      if (!page.meta.noCache) {
        state.tags.cachedPages.push(page.name)
      }
    },
    DEL_VISITED_PAGE: (state, page) => {
      const index = state.tags.visitedPages.findIndex(v => v.path === page.path)
      state.tags.visitedPages.splice(index, 1)
    },
    DEL_CACHED_PAGE: (state, page) => {
      const index = state.tags.cachedPages.indexOf(page.name)
      if (index !== -1) {
        state.tags.cachedPages.splice(index, 1)
      }
    },
    DEL_OTHER_VISITED_PAGE: (state, page) => {
      const index = state.tags.visitedPages.findIndex(v => v.name === page.name)
      state.tags.visitedPages = state.tags.visitedPages.slice(index, index + 1)
    },
    DEL_OTHER_CACHED_PAGE: (state, page) => {
      const index = state.tags.cachedPages.indexOf(page.name)
      if (index !== -1) {
        state.tags.cachedPages = state.tags.cachedPages.slice(index, index + 1)
      }
    },
    TOGGLE_SIDEMENU: state => {
      state.sidemenu.collapse = !state.sidemenu.collapse
    },
    DEL_ALL_CACHED_PAGE: state => {
      state.tags.visitedPages = []
      state.tags.cachedPages = []
    }
  },
  actions: {
    addPage ({ dispatch }, page) {
      dispatch('addVisitedPage', page)
      dispatch('addCachedPage', page)
    },
    addVisitedPage ({ commit }, page) {
      commit('ADD_VISITED_PAGE', page)
    },
    addCachedPage ({ commit }, page) {
      commit('ADD_CACHED_PAGE', page)
    },
    delPage ({ dispatch, state }, page) {
      return new Promise(resolve => {
        dispatch('delVisitedPage', page)
        dispatch('delCachedPage', page)
        resolve({
          visitedPages: [...state.tags.visitedPages],
          cachedPages: [...state.tags.cachedPages]
        })
      })
    },
    delVisitedPage ({ commit }, page) {
      commit('DEL_VISITED_PAGE', page)
    },
    delCachedPage ({ commit }, page) {
      commit('DEL_CACHED_PAGE', page)
    },
    delOtherPage ({ dispatch, state }, page) {
      return new Promise(resolve => {
        dispatch('delOtherVisitedPage', page)
        dispatch('delOtherCachedPage', page)
        resolve({
          visitedPages: [...state.tags.visitedPages],
          cachedPages: [...state.tags.cachedPages]
        })
      })
    },
    delOtherVisitedPage ({ commit }, page) {
      commit('DEL_OTHER_VISITED_PAGE', page)
    },
    delOtherCachedPage ({ commit }, page) {
      commit('DEL_OTHER_CACHED_PAGE', page)
    },
    delAllPage ({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_PAGE')
        resolve({
          visitedPages: [...state.tags.visitedPages],
          cachedPages: [...state.tags.cachedPages]
        })
      })
    },
    toggleSideMenu ({ commit }) {
      commit('TOGGLE_SIDEMENU')
    }
  }
}
export default model

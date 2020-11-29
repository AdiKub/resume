import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    user: {
      displayName: ''
    }
  }
}

export default new Vuex.Store({
  state: getDefaultState(),
  mutations: {
    signOut (state) {
      state.user = {
        displayName: ''
      }
    }
  },

  actions: {
    signOut: ({ commit }) => commit('signOut')
  }
})

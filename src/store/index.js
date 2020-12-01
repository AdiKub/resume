import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    experiense: {}
  }
}

export default new Vuex.Store({
  state: getDefaultState(),
  mutations: {
    signOut (state) {
      state.experiense = ''
    }
  },

  actions: {
    signOut: ({ commit }) => commit('signOut')
  }
})

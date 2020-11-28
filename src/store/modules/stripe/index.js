import {
  SET_PAYMENT_REJECTED,
  SET_PAYMENT_FULFILLED,
} from './mutationTypes'

import apiStripe from '@/api/apiStripe'

const state = () => ({
  payment: {
    error: false,
  },
})

const actions = {
  async setPayment({ commit }, data) {
    return await apiStripe
      .stripePayment(data)
      .then(response => {
        commit(SET_PAYMENT_FULFILLED, response)
      })
      .catch(error => {
        commit(SET_PAYMENT_REJECTED, error)
      })
  },
}

const mutations = {
  [SET_PAYMENT_FULFILLED](state, response) {
    state.payment.error = true
  },
  [SET_PAYMENT_REJECTED](state, error) {
    state.payment.error = true
  },  
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

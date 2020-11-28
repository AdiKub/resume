import {
  GET_STYLIST_BY_ID_PENDING,
  GET_STYLIST_BY_ID_FULFILLED,
  GET_STYLIST_BY_ID_REJECTED,
  GET_STYLIST_SEVICE_BY_ID_PENDING,
  GET_STYLIST_SEVICE_BY_ID_REJECTED,
  GET_STYLIST_SEVICE_BY_ID_FULFILLED,
  GET_STYLIST_OPEN_HOURS
} from './mutationTypes'

import stylistsApi from '@/api/stylistsApi'

const state = () => ({
  getStylistById: {
    stylist: {},
    error: null,
    isPending: false
  },
  stylistServiceById: {
    services: [],
    error: null,
    isPending: false
  },
  stylistOpenHour: []
})

const actions = {
  async getStylistById({ commit, rootState }, stylistId) {
    const token = rootState.auth.token

    commit(GET_STYLIST_BY_ID_PENDING)
    return await stylistsApi
      .getStylistById(token, stylistId)
      .then(response => {
        commit(GET_STYLIST_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_STYLIST_BY_ID_REJECTED, error)
      })
  },

  getStylistServiceById({ commit, rootState }, stylistId) {
    const token = rootState.auth.token
    
    commit(GET_STYLIST_SEVICE_BY_ID_PENDING)
    return stylistsApi
      .getStylistServiceById(token, stylistId)
      .then(response => {
        commit(GET_STYLIST_SEVICE_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_STYLIST_SEVICE_BY_ID_REJECTED, error)
      })
  },

  async getStylistOpenHours({commit, rootState}, stylistId) {
    const token = rootState.auth.token

    return await stylistsApi 
      .getStylistOpenHours(token, stylistId)
      .then( response => {
        commit(GET_STYLIST_OPEN_HOURS, response)
      })
      .catch(error => {
        commit(GET_STYLIST_SEVICE_BY_ID_REJECTED, error)
      })
  }
}

const mutations = {
  // get staylist open hours
  [GET_STYLIST_OPEN_HOURS](state, response) {
    state.stylistOpenHour = response.data
  },
  // Get stylist service by id
  [GET_STYLIST_SEVICE_BY_ID_PENDING](state) {
    state.stylistServiceById.services = []
    state.stylistServiceById.error = null
    state.stylistServiceById.isPending = true
  },
  [GET_STYLIST_SEVICE_BY_ID_FULFILLED](state, response) {
    state.stylistServiceById.services = response.data
    state.stylistServiceById.isPending = false
  },
  [GET_STYLIST_SEVICE_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data
    
    state.stylistServiceById.services = []
    state.stylistServiceById.error = { code, message }
    state.stylistServiceById.isPending = false
  },
  // Get stylist by id
  [GET_STYLIST_BY_ID_PENDING](state) {
    state.getStylistById.stylist = {}
    state.getStylistById.error = null
    state.getStylistById.isPending = true
  },
  [GET_STYLIST_BY_ID_FULFILLED](state, stylist) {
    state.getStylistById.stylist = stylist
    state.getStylistById.error = null
    state.getStylistById.isPending = false
  },
  [GET_STYLIST_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getStylistById.stylist = {}
    state.getStylistById.error = { code, message }
    state.getStylistById.isPending = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

import {
  CREATE_OPEN_HOURS_PENDING,
  CREATE_OPEN_HOURS_FULFILLED,
  CREATE_OPEN_HOURS_REJECTED,
  GET_OPEN_HOURS_PENDING,
  GET_OPEN_HOURS_FULFILLED,
  GET_OPEN_HOURS_REJECTED,
  GET_OPEN_HOURS_BY_ID_PENDING,
  GET_OPEN_HOURS_BY_ID_FULFILLED,
  GET_OPEN_HOURS_BY_ID_REJECTED
} from './mutationTypes'

import openHoursApi from '@/api/openHoursApi'

const state = () => ({
  createOpenHours: {
    OpenHours: {},
    error: null,
    isPending: false
  },
  getOpenHours: {
    openHours: [],
    error: null,
    isPending: false
  },
  getOpenHoursById: {
    openHours: {},
    error: null,
    isPending: false
  }
})

const actions = {
  async createOpenHours({ commit, rootState }, data) {
    const token = rootState.auth.token

    commit(CREATE_OPEN_HOURS_PENDING)
    return await openHoursApi
      .createOpenHours(token, data)
      .then(response => {
        commit(CREATE_OPEN_HOURS_FULFILLED, response)
      })
      .catch(error => {
        commit(CREATE_OPEN_HOURS_REJECTED, error)
      })
  },

  async getOpenHours({ commit, rootState }, pageNumber) {
    const token = rootState.auth.token

    commit(GET_OPEN_HOURS_PENDING)
    return await openHoursApi
      .getOpenHours(token, pageNumber)
      .then(response => {
        commit(GET_OPEN_HOURS_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_OPEN_HOURS_REJECTED, error)
      })
  },

  async getOpenHoursById({ commit, rootState }, openHoursId) {
    const token = rootState.auth.token

    commit(GET_OPEN_HOURS_BY_ID_PENDING)
    return await openHoursApi
      .getOpenHoursById(token, openHoursId)
      .then(response => {
        commit(GET_OPEN_HOURS_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_OPEN_HOURS_BY_ID_REJECTED, error)
      })
  }
}

const mutations = {
  // Create new open hours
  [CREATE_OPEN_HOURS_PENDING](state) {
    state.createOpenHours.openHours = {}
    state.createOpenHours.error = null
    state.createOpenHours.isPending = true
  },
  [CREATE_OPEN_HOURS_FULFILLED](state, createdOpenHours) {
    state.createOpenHours.openHours = createdOpenHours
    state.createOpenHours.error = null
    state.createOpenHours.isPending = false
  },
  [CREATE_OPEN_HOURS_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.createOpenHours.openHours = {}
    state.createOpenHours.error = { code, message }
    state.createOpenHours.isPending = false
  },

  // Get open hours
  [GET_OPEN_HOURS_PENDING](state) {
    state.getOpenHours.openHours = []
    state.getOpenHours.error = null
    state.getOpenHours.isPending = true
  },
  [GET_OPEN_HOURS_FULFILLED](state, openHours) {
    state.getOpenHours.openHours = openHours
    state.getOpenHours.error = null
    state.getOpenHours.isPending = false
  },
  [GET_OPEN_HOURS_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getOpenHours.openHours = []
    state.getOpenHours.error = { code, message }
    state.getOpenHours.isPending = false
  },

  // Get open hours by id
  [GET_OPEN_HOURS_BY_ID_PENDING](state) {
    state.getOpenHoursById.openHours = {}
    state.getOpenHoursById.error = null
    state.getOpenHoursById.isPending = true
  },
  [GET_OPEN_HOURS_BY_ID_FULFILLED](state, openHours) {
    state.getOpenHoursById.openHours = openHours
    state.getOpenHoursById.error = null
    state.getOpenHoursById.isPending = false
  },
  [GET_OPEN_HOURS_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getOpenHoursById.openHours = {}
    state.getOpenHoursById.error = { code, message }
    state.getOpenHoursById.isPending = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

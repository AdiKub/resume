import {
  CREATE_SERVICE_PENDING,
  CREATE_SERVICE_FULFILLED,
  CREATE_SERVICE_REJECTED,
  GET_SERVICE_BY_ID_PENDING,
  GET_SERVICE_BY_ID_FULFILLED,
  GET_SERVICE_BY_ID_REJECTED,
  GET_STYLIST_SERVICES_PENDING,
  GET_STYLIST_SERVICES_FULFILLED,
  GET_STYLIST_SERVICES_REJECTED,
  UPDATE_SERVICE_BY_ID_PENDING,
  UPDATE_SERVICE_BY_ID_FULFILLED,
  UPDATE_SERVICE_BY_ID_REJECTED,
  DELETE_SERVICE_BY_ID_PENDING,
  DELETE_SERVICE_BY_ID_FULFILLED,
  DELETE_SERVICE_BY_ID_REJECTED
} from './mutationTypes'

import servicesApi from '@/api/servicesApi'

const state = () => ({
  createService: {
    service: {},
    error: null,
    isPending: false
  },
  getServiceById: {
    service: {},
    error: null,
    isPending: false
  },
  updateServiceById: {
    service: {},
    error: null,
    isPending: false
  },
  deleteServiceById: {
    error: null,
    isPending: false
  },
  stylistServices: {
    services: [],
    error: null,
    isPending: false
  }
})

const actions = {
  async createService({ commit, rootState }, data) {
    const token = rootState.auth.token

    commit(CREATE_SERVICE_PENDING)
    return await servicesApi
      .createService(token, data)
      .then(response => {
        commit(CREATE_SERVICE_FULFILLED, response)
      })
      .catch(error => {
        commit(CREATE_SERVICE_REJECTED, error)
      })
  },

  async getServiceById({ commit, rootState }, serviceId) {
    const token = rootState.auth.token

    commit(GET_SERVICE_BY_ID_PENDING)
    return await servicesApi
      .getServiceById(token, serviceId)
      .then(response => {
        commit(GET_SERVICE_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_SERVICE_BY_ID_REJECTED, error)
      })
  },

  async getAllServices({ commit, rootState }, stylistId) {
    const token = rootState.auth.token

    commit(GET_STYLIST_SERVICES_PENDING)
    return await servicesApi
      .getStylistServices(token, stylistId)
      .then(response => {
        commit(GET_STYLIST_SERVICES_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_STYLIST_SERVICES_REJECTED, error)
      })
  },

  async updateServiceById({ commit, rootState }, serviceId) {
    const token = rootState.auth.token

    commit(UPDATE_SERVICE_BY_ID_PENDING)
    return await servicesApi
      .updateServiceById(token, serviceId)
      .then(response => {
        commit(UPDATE_SERVICE_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(UPDATE_SERVICE_BY_ID_REJECTED, error)
      })
  },

  async deleteServiceById({ commit, rootState }, serviceId) {
    const token = rootState.auth.token

    commit(DELETE_SERVICE_BY_ID_PENDING)
    return await servicesApi
      .deleteServiceById(token, serviceId)
      .then(() => {
        commit(DELETE_SERVICE_BY_ID_FULFILLED)
      })
      .catch(error => {
        commit(DELETE_SERVICE_BY_ID_REJECTED, error)
      })
  }
}

const mutations = {
  // Create new service
  [CREATE_SERVICE_PENDING](state) {
    state.createService.service = {}
    state.createService.error = null
    state.createService.isPending = true
  },
  [CREATE_SERVICE_FULFILLED](state, createdService) {
    state.createService.service = createdService
    state.createService.error = null
    state.createService.isPending = false
  },
  [CREATE_SERVICE_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.createService.service = {}
    state.createService.error = { code, message }
    state.createService.isPending = false
  },

  // Get service by id
  [GET_SERVICE_BY_ID_PENDING](state) {
    state.getServiceById.service = {}
    state.getServiceById.error = null
    state.getServiceById.isPending = true
  },
  [GET_SERVICE_BY_ID_FULFILLED](state, service) {
    state.getServiceById.service = service
    state.getServiceById.error = null
    state.getServiceById.isPending = false
  },
  [GET_SERVICE_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getServiceById.service = {}
    state.getServiceById.error = { code, message }
    state.getServiceById.isPending = false
  },

  // get all services
  [GET_STYLIST_SERVICES_PENDING](state) {
    state.stylistServices.services = []
    state.stylistServices.error = null
    state.stylistServices.isPending = true
  },
  [GET_STYLIST_SERVICES_FULFILLED](state, services) {
    state.stylistServices.services = services.data
    state.stylistServices.error = null
    state.stylistServices.isPending = false
  },
  [GET_STYLIST_SERVICES_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.stylistServices.services = []
    state.stylistServices.error = { code, message }
    state.stylistServices.isPending = false
  },

  // Update service by id
  [UPDATE_SERVICE_BY_ID_PENDING](state) {
    state.updateServiceById.service = {}
    state.updateServiceById.error = null
    state.updateServiceById.isPending = true
  },
  [UPDATE_SERVICE_BY_ID_FULFILLED](state, updatedService) {
    state.updateServiceById.service = updatedService
    state.updateServiceById.error = null
    state.updateServiceById.isPending = false
  },
  [UPDATE_SERVICE_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.updateServiceById.service = {}
    state.updateServiceById.error = { code, message }
    state.updateServiceById.isPending = false
  },

  // Delete service by id
  [DELETE_SERVICE_BY_ID_PENDING](state) {
    state.deleteServiceById.error = null
    state.deleteServiceById.isPending = true
  },
  [DELETE_SERVICE_BY_ID_FULFILLED](state) {
    state.deleteServiceById.error = null
    state.deleteServiceById.isPending = false
  },
  [DELETE_SERVICE_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.deleteServiceById.error = { code, message }
    state.deleteServiceById.isPending = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

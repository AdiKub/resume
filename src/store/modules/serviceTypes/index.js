import {
  GET_SERVICE_TYPES_PENDING,
  GET_SERVICE_TYPES_FULFILLED,
  GET_SERVICE_TYPES_REJECTED,
  GET_SERVICE_TYPE_BY_ID_PENDING,
  GET_SERVICE_TYPE_BY_ID_FULFILLED,
  GET_SERVICE_TYPE_BY_ID_REJECTED,
  GET_SERVICE_TYPES_BY_SERVICE_CATEGORY_ID_PENDING,
  GET_SERVICE_TYPES_BY_SERVICE_CATEGORY_ID_FULFILLED,
  GET_SERVICE_TYPES_BY_SERVICE_CATEGORY_ID_REJECTED,
  GET_SERVICE_TYPES_BY_BUSINESS_AND_SERVICE_CATEGORIES_IDS_PENDING,
  GET_SERVICE_TYPES_BY_BUSINESS_AND_SERVICE_CATEGORIES_IDS_FULFILLED,
  GET_SERVICE_TYPES_BY_BUSINESS_AND_SERVICE_CATEGORIES_IDS_REJECTED,
  SET_SERVICE_NAME,
  SET_SERVICE_TYPE
} from './mutationTypes'

import serviceTypesApi from '@/api/serviceTypesApi'

const state = () => ({
  selectedServiceName: null,
  selectedServiceType: null,
  getServiceTypes: {
    serviceTypes: [],
    error: null,
    isPending: false
  },
  getServiceTypeById: {
    serviceType: {},
    error: null,
    isPending: false
  },
  getServiceTypesByServiceCategoryId: {
    serviceTypes: [],
    error: null,
    isPending: false
  },
  getServiceTypesByBusinessAndServiceCategoriesIds: {
    serviceTypes: [],
    error: null,
    isPending: false
  }
})

const actions = {
  async getServiceTypes({ commit, rootState }, pageNumber) {
    const token = rootState.auth.token

    commit(GET_SERVICE_TYPES_PENDING)
    return await serviceTypesApi
      .getServiceTypes(token, pageNumber)
      .then(response => {
        commit(GET_SERVICE_TYPES_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_SERVICE_TYPES_REJECTED, error)
      })
  },

  async getServiceTypeById({ commit, rootState }, serviceTypeId) {
    const token = rootState.auth.token

    commit(GET_SERVICE_TYPE_BY_ID_PENDING)
    return await serviceTypesApi
      .getServiceTypeById(token, serviceTypeId)
      .then(response => {
        commit(GET_SERVICE_TYPE_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_SERVICE_TYPE_BY_ID_REJECTED, error)
      })
  },

  async getServiceTypesByServiceCategoryId({ commit, rootState }, serviceCategoryId, pageNumber) {
    const token = rootState.auth.token

    commit(GET_SERVICE_TYPES_BY_SERVICE_CATEGORY_ID_PENDING)
    return await serviceTypesApi
      .getServiceTypesByServiceCategoryId(token, serviceCategoryId, pageNumber)
      .then(response => {
        commit(GET_SERVICE_TYPES_BY_SERVICE_CATEGORY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_SERVICE_TYPES_BY_SERVICE_CATEGORY_ID_REJECTED, error)
      })
  },

  async getServiceTypesByBusinessAndServiceCategoriesIds(
    { commit, rootState },
    { businessCategoryId, serviceCategoryId, pageNumber }
  ) {
    const token = rootState.auth.token

    commit(GET_SERVICE_TYPES_BY_BUSINESS_AND_SERVICE_CATEGORIES_IDS_PENDING)
    return await serviceTypesApi
      .getServiceTypesByBusinessAndServiceCategoriesIds(
        token,
        businessCategoryId,
        serviceCategoryId,
        pageNumber
      )
      .then(response => {
        commit(GET_SERVICE_TYPES_BY_BUSINESS_AND_SERVICE_CATEGORIES_IDS_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_SERVICE_TYPES_BY_BUSINESS_AND_SERVICE_CATEGORIES_IDS_REJECTED, error)
      })
  },

  setServiceType({ commit } , serviceType) {
    commit(SET_SERVICE_TYPE, serviceType)
  },

  setServiceName({ commit }, selectedServiceType) {
    commit(SET_SERVICE_NAME, selectedServiceType)
  },
}

const mutations = {
   // Set service type 
  [SET_SERVICE_NAME](state, selectedServiceType) {
    state.selectedServiceName = selectedServiceType
  },
  [SET_SERVICE_TYPE](state, serviceType) {
    state.selectedServiceType = serviceType
  },
  // Get service types
  [GET_SERVICE_TYPES_PENDING](state) {
    state.getServiceTypes.serviceTypes = []
    state.getServiceTypes.error = null
    state.getServiceTypes.isPending = true
  },
  [GET_SERVICE_TYPES_FULFILLED](state, serviceTypes) {
    state.getServiceTypes.serviceTypes = serviceTypes
    state.getServiceTypes.error = null
    state.getServiceTypes.isPending = false
  },
  [GET_SERVICE_TYPES_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getServiceTypes.serviceTypes = []
    state.getServiceTypes.error = { code, message }
    state.getServiceTypes.isPending = false
  },

  // Get service type by id
  [GET_SERVICE_TYPE_BY_ID_PENDING](state) {
    state.getServiceTypeById.serviceType = {}
    state.getServiceTypeById.error = null
    state.getServiceTypeById.isPending = true
  },
  [GET_SERVICE_TYPE_BY_ID_FULFILLED](state, serviceType) {
    state.getServiceTypeById.serviceType = serviceType
    state.getServiceTypeById.error = null
    state.getServiceTypeById.isPending = false
  },
  [GET_SERVICE_TYPE_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getServiceTypeById.serviceType = {}
    state.getServiceTypeById.error = { code, message }
    state.getServiceTypeById.isPending = false
  },

  // Get service types by service category id
  [GET_SERVICE_TYPES_BY_SERVICE_CATEGORY_ID_PENDING](state) {
    state.getServiceTypesByServiceCategoryId.serviceTypes = []
    state.getServiceTypesByServiceCategoryId.error = null
    state.getServiceTypesByServiceCategoryId.isPending = true
  },
  [GET_SERVICE_TYPES_BY_SERVICE_CATEGORY_ID_FULFILLED](state, serviceTypes) {
    state.getServiceTypesByServiceCategoryId.serviceTypes = serviceTypes
    state.getServiceTypesByServiceCategoryId.error = null
    state.getServiceTypesByServiceCategoryId.isPending = false
  },
  [GET_SERVICE_TYPES_BY_SERVICE_CATEGORY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getServiceTypesByServiceCategoryId.serviceTypes = []
    state.getServiceTypesByServiceCategoryId.error = { code, message }
    state.getServiceTypesByServiceCategoryId.isPending = false
  },

  // Get service types by business and service categories ids
  [GET_SERVICE_TYPES_BY_BUSINESS_AND_SERVICE_CATEGORIES_IDS_PENDING](state) {
    state.getServiceTypesByBusinessAndServiceCategoriesIds.error = null
    state.getServiceTypesByBusinessAndServiceCategoriesIds.isPending = true
  },
  [GET_SERVICE_TYPES_BY_BUSINESS_AND_SERVICE_CATEGORIES_IDS_FULFILLED](state, response) {
    const serviceTypes = response.data

    state.getServiceTypesByBusinessAndServiceCategoriesIds.serviceTypes = [
      ...state.getServiceTypesByBusinessAndServiceCategoriesIds.serviceTypes,
      ...serviceTypes
    ]
    state.getServiceTypesByBusinessAndServiceCategoriesIds.error = null
    state.getServiceTypesByBusinessAndServiceCategoriesIds.isPending = false
  },
  [GET_SERVICE_TYPES_BY_BUSINESS_AND_SERVICE_CATEGORIES_IDS_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getServiceTypesByBusinessAndServiceCategoriesIds.error = { code, message }
    state.getServiceTypesByBusinessAndServiceCategoriesIds.isPending = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

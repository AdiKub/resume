import {
  GET_SERVICE_CATEGORIES_PENDING,
  GET_SERVICE_CATEGORIES_FULFILLED,
  GET_SERVICE_CATEGORIES_REJECTED,
  GET_SERVICE_CATEGORY_BY_ID_PENDING,
  GET_SERVICE_CATEGORY_BY_ID_FULFILLED,
  GET_SERVICE_CATEGORY_BY_ID_REJECTED,
  GET_SERVICE_CATEGORIES_BY_BUSINESS_CATEGORY_ID_PENDING,
  GET_SERVICE_CATEGORIES_BY_BUSINESS_CATEGORY_ID_FULFILLED,
  GET_SERVICE_CATEGORIES_BY_BUSINESS_CATEGORY_ID_REJECTED
} from './mutationTypes'

import serviceCategoriesApi from '@/api/serviceCategoriesApi'

const state = () => ({
  getServiceCategories: {
    serviceCategories: [],
    error: null,
    isPending: false
  },
  getServiceCategoryById: {
    serviceCategory: {},
    error: null,
    isPending: false
  },
  getServiceCategoriesByBusinessCategoryId: {
    serviceCategories: [],
    error: null,
    isPending: false
  }
})

const actions = {
  async getServiceCategories({ commit, rootState }, pageNumber) {
    const token = rootState.auth.token

    commit(GET_SERVICE_CATEGORIES_PENDING)
    return await serviceCategoriesApi
      .getServiceCategories(token, pageNumber)
      .then(response => {
        commit(GET_SERVICE_CATEGORIES_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_SERVICE_CATEGORIES_REJECTED, error)
      })
  },

  async getServiceCategoryById({ commit, rootState }, serviceCategoryId) {
    const token = rootState.auth.token

    commit(GET_SERVICE_CATEGORY_BY_ID_PENDING)
    return await serviceCategoriesApi
      .getServiceCategoryById(token, serviceCategoryId)
      .then(response => {
        commit(GET_SERVICE_CATEGORY_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_SERVICE_CATEGORY_BY_ID_REJECTED, error)
      })
  },

  async getServiceCategoriesByBusinessCategoryId(
    { commit, rootState },
    businessCategoryId,
    pageNumber
  ) {
    const token = rootState.auth.token

    commit(GET_SERVICE_CATEGORIES_BY_BUSINESS_CATEGORY_ID_PENDING)
    return await serviceCategoriesApi
      .getServiceCategoriesByBusinessCategoryId(token, businessCategoryId, pageNumber)
      .then(response => {
        commit(GET_SERVICE_CATEGORIES_BY_BUSINESS_CATEGORY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_SERVICE_CATEGORIES_BY_BUSINESS_CATEGORY_ID_REJECTED, error)
      })
  }
}

const mutations = {
  // Get service categories
  [GET_SERVICE_CATEGORIES_PENDING](state) {
    state.getServiceCategories.serviceCategories = []
    state.getServiceCategories.error = null
    state.getServiceCategories.isPending = true
  },
  [GET_SERVICE_CATEGORIES_FULFILLED](state, serviceCategories) {
    state.getServiceCategories.serviceCategories = serviceCategories
    state.getServiceCategories.error = null
    state.getServiceCategories.isPending = false
  },
  [GET_SERVICE_CATEGORIES_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getServiceCategories.serviceCategories = []
    state.getServiceCategories.error = { code, message }
    state.getServiceCategories.isPending = false
  },

  // Get service category by id
  [GET_SERVICE_CATEGORY_BY_ID_PENDING](state) {
    state.getServiceCategoryById.serviceCategory = {}
    state.getServiceCategoryById.error = null
    state.getServiceCategoryById.isPending = true
  },
  [GET_SERVICE_CATEGORY_BY_ID_FULFILLED](state, serviceCategory) {
    state.getServiceCategoryById.serviceCategory = serviceCategory
    state.getServiceCategoryById.error = null
    state.getServiceCategoryById.isPending = false
  },
  [GET_SERVICE_CATEGORY_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getServiceCategoryById.serviceCategory = {}
    state.getServiceCategoryById.error = { code, message }
    state.getServiceCategoryById.isPending = false
  },

  // Get service categories by business category id
  [GET_SERVICE_CATEGORIES_BY_BUSINESS_CATEGORY_ID_PENDING](state) {
    state.getServiceCategoriesByBusinessCategoryId.serviceCategories = []
    state.getServiceCategoriesByBusinessCategoryId.error = null
    state.getServiceCategoriesByBusinessCategoryId.isPending = true
  },
  [GET_SERVICE_CATEGORIES_BY_BUSINESS_CATEGORY_ID_FULFILLED](state, response) {
    const serviceCategories = response.data

    state.getServiceCategoriesByBusinessCategoryId.serviceCategories = serviceCategories
    state.getServiceCategoriesByBusinessCategoryId.error = null
    state.getServiceCategoriesByBusinessCategoryId.isPending = false
  },
  [GET_SERVICE_CATEGORIES_BY_BUSINESS_CATEGORY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getServiceCategoriesByBusinessCategoryId.serviceCategories = []
    state.getServiceCategoriesByBusinessCategoryId.error = { code, message }
    state.getServiceCategoriesByBusinessCategoryId.isPending = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

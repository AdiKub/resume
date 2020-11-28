import {
  GET_BUSINESS_CATEGORIES_PENDING,
  GET_BUSINESS_CATEGORIES_FULFILLED,
  GET_BUSINESS_CATEGORIES_REJECTED,
  GET_BUSINESS_CATEGORY_BY_ID_PENDING,
  GET_BUSINESS_CATEGORY_BY_ID_FULFILLED,
  GET_BUSINESS_CATEGORY_BY_ID_REJECTED
} from './mutationTypes'

import businessCategoriesApi from '@/api/businessCategoriesApi'

const state = () => ({
  getBusinessCategories: {
    businessCategories: [],
    error: null,
    isPending: false
  },
  getBusinessCategoryById: {
    businessCategory: {},
    error: null,
    isPending: false
  }
})

const actions = {
  async getBusinessCategories({ commit, rootState }, pageNumber) {
    const token = rootState.auth.token

    commit(GET_BUSINESS_CATEGORIES_PENDING)
    return await businessCategoriesApi
      .getBusinessCategories(token, pageNumber)
      .then(response => {
        commit(GET_BUSINESS_CATEGORIES_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_BUSINESS_CATEGORIES_REJECTED, error)
      })
  },

  async getBusinessCategoryById({ commit, rootState }, businessCategoryId) {
    const token = rootState.auth.token

    commit(GET_BUSINESS_CATEGORY_BY_ID_PENDING)
    return await businessCategoriesApi
      .getBusinessCategoryById(token, businessCategoryId)
      .then(response => {
        commit(GET_BUSINESS_CATEGORY_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_BUSINESS_CATEGORY_BY_ID_REJECTED, error)
      })
  }
}

const mutations = {
  // Get business categories
  [GET_BUSINESS_CATEGORIES_PENDING](state) {
    state.getBusinessCategories.businessCategories = []
    state.getBusinessCategories.error = null
    state.getBusinessCategories.isPending = true
  },
  [GET_BUSINESS_CATEGORIES_FULFILLED](state, response) {
    const businessCategories = response.data

    state.getBusinessCategories.businessCategories = businessCategories
    state.getBusinessCategories.error = null
    state.getBusinessCategories.isPending = false
  },
  [GET_BUSINESS_CATEGORIES_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getBusinessCategories.businessCategories = []
    state.getBusinessCategories.error = { code, message }
    state.getBusinessCategories.isPending = false
  },

  // Get business category by id
  [GET_BUSINESS_CATEGORY_BY_ID_PENDING](state) {
    state.getBusinessCategoryById.businessCategory = {}
    state.getBusinessCategoryById.error = null
    state.getBusinessCategoryById.isPending = true
  },
  [GET_BUSINESS_CATEGORY_BY_ID_FULFILLED](state, businessCategory) {
    state.getBusinessCategoryById.businessCategory = businessCategory
    state.getBusinessCategoryById.error = null
    state.getBusinessCategoryById.isPending = false
  },
  [GET_BUSINESS_CATEGORY_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getBusinessCategoryById.businessCategory = {}
    state.getBusinessCategoryById.error = { code, message }
    state.getBusinessCategoryById.isPending = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

import {
  CREATE_REVIEW_PENDING,
  CREATE_REVIEW_FULFILLED,
  CREATE_REVIEW_REJECTED,
  GET_REVIEWS_PENDING,
  GET_REVIEWS_FULFILLED,
  GET_REVIEWS_REJECTED,
  GET_REVIEW_BY_ID_PENDING,
  GET_REVIEW_BY_ID_FULFILLED,
  GET_REVIEW_BY_ID_REJECTED,
  UPDATE_REVIEW_BY_ID_PENDING,
  UPDATE_REVIEW_BY_ID_FULFILLED,
  UPDATE_REVIEW_BY_ID_REJECTED,
  REPLACE_REVIEW_BY_ID_PENDING,
  REPLACE_REVIEW_BY_ID_FULFILLED,
  REPLACE_REVIEW_BY_ID_REJECTED,
  DELETE_REVIEW_BY_ID_PENDING,
  DELETE_REVIEW_BY_ID_FULFILLED,
  DELETE_REVIEW_BY_ID_REJECTED
} from './mutationTypes'

import reviewsApi from '@/api/reviewsApi'

const state = () => ({
  createReview: {
    review: {},
    error: null,
    isPending: false
  },
  getReviews: {
    reviews: [],
    error: null,
    isPending: false
  },
  getReviewById: {
    review: {},
    error: null,
    isPending: false
  },
  updateReviewById: {
    review: {},
    error: null,
    isPending: false
  },
  replaceReviewById: {
    review: {},
    error: null,
    isPending: false
  },
  deleteReviewById: {
    error: null,
    isPending: false
  }
})

const actions = {
  async createReview({ commit, rootState }, data) {
    const token = rootState.auth.token

    commit(CREATE_REVIEW_PENDING)
    return await reviewsApi
      .createReview(token, data)
      .then(response => {
        commit(CREATE_REVIEW_FULFILLED, response)
      })
      .catch(error => {
        commit(CREATE_REVIEW_REJECTED, error)
      })
  },

  async getReviews({ commit, rootState }, pageNumber) {
    const token = rootState.auth.token

    commit(GET_REVIEWS_PENDING)
    return await reviewsApi
      .getReviews(token, pageNumber)
      .then(response => {
        commit(GET_REVIEWS_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_REVIEWS_REJECTED, error)
      })
  },

  async getReviewById({ commit, rootState }, reviewId) {
    const token = rootState.auth.token

    commit(GET_REVIEW_BY_ID_PENDING)
    return await reviewsApi
      .getReviewById(token, reviewId)
      .then(response => {
        commit(GET_REVIEW_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_REVIEW_BY_ID_REJECTED, error)
      })
  },

  async updateReviewById({ commit, rootState }, reviewId) {
    const token = rootState.auth.token

    commit(UPDATE_REVIEW_BY_ID_PENDING)
    return await reviewsApi
      .updateReviewById(token, reviewId)
      .then(response => {
        commit(UPDATE_REVIEW_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(UPDATE_REVIEW_BY_ID_REJECTED, error)
      })
  },

  async replaceReviewById({ commit, rootState }, reviewId) {
    const token = rootState.auth.token

    commit(REPLACE_REVIEW_BY_ID_PENDING)
    return await reviewsApi
      .replaceReviewById(token, reviewId)
      .then(response => {
        commit(REPLACE_REVIEW_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(REPLACE_REVIEW_BY_ID_REJECTED, error)
      })
  },

  async deleteReviewById({ commit, rootState }, reviewId) {
    const token = rootState.auth.token

    commit(DELETE_REVIEW_BY_ID_PENDING)
    return await reviewsApi
      .deleteReviewById(token, reviewId)
      .then(() => {
        commit(DELETE_REVIEW_BY_ID_FULFILLED)
      })
      .catch(error => {
        commit(DELETE_REVIEW_BY_ID_REJECTED, error)
      })
  }
}

const mutations = {
  // Create new review
  [CREATE_REVIEW_PENDING](state) {
    state.createReview.review = {}
    state.createReview.error = null
    state.createReview.isPending = true
  },
  [CREATE_REVIEW_FULFILLED](state, createdReview) {
    state.createReview.review = createdReview
    state.createReview.error = null
    state.createReview.isPending = false
  },
  [CREATE_REVIEW_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.createReview.review = {}
    state.createReview.error = { code, message }
    state.createReview.isPending = false
  },

  // Get reviews
  [GET_REVIEWS_PENDING](state) {
    state.getReviews.reviews = []
    state.getReviews.error = null
    state.getReviews.isPending = true
  },
  [GET_REVIEWS_FULFILLED](state, reviews) {
    state.getReviews.reviews = reviews
    state.getReviews.error = null
    state.getReviews.isPending = false
  },
  [GET_REVIEWS_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getReviews.reviews = []
    state.getReviews.error = { code, message }
    state.getReviews.isPending = false
  },

  // Get review by id
  [GET_REVIEW_BY_ID_PENDING](state) {
    state.getReviewById.review = {}
    state.getReviewById.error = null
    state.getReviewById.isPending = true
  },
  [GET_REVIEW_BY_ID_FULFILLED](state, review) {
    state.getReviewById.review = review
    state.getReviewById.error = null
    state.getReviewById.isPending = false
  },
  [GET_REVIEW_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getReviewById.review = {}
    state.getReviewById.error = { code, message }
    state.getReviewById.isPending = false
  },

  // Update review by id
  [UPDATE_REVIEW_BY_ID_PENDING](state) {
    state.updateReviewById.review = {}
    state.updateReviewById.error = null
    state.updateReviewById.isPending = true
  },
  [UPDATE_REVIEW_BY_ID_FULFILLED](state, updatedReview) {
    state.updateReviewById.review = updatedReview
    state.updateReviewById.error = null
    state.updateReviewById.isPending = false
  },
  [UPDATE_REVIEW_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.updateReviewById.review = {}
    state.updateReviewById.error = { code, message }
    state.updateReviewById.isPending = false
  },

  // Replace review by id
  [REPLACE_REVIEW_BY_ID_PENDING](state) {
    state.replaceReviewById.review = {}
    state.replaceReviewById.error = null
    state.replaceReviewById.isPending = true
  },
  [REPLACE_REVIEW_BY_ID_FULFILLED](state, newReview) {
    state.replaceReviewById.review = newReview
    state.replaceReviewById.error = null
    state.replaceReviewById.isPending = false
  },
  [REPLACE_REVIEW_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.replaceReviewById.review = {}
    state.replaceReviewById.error = { code, message }
    state.replaceReviewById.isPending = false
  },

  // Delete review by id
  [DELETE_REVIEW_BY_ID_PENDING](state) {
    state.deleteReviewById.error = null
    state.deleteReviewById.isPending = true
  },
  [DELETE_REVIEW_BY_ID_FULFILLED](state) {
    state.deleteReviewById.error = null
    state.deleteReviewById.isPending = false
  },
  [DELETE_REVIEW_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.deleteReviewById.error = { code, message }
    state.deleteReviewById.isPending = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

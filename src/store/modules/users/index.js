import {
  GET_USER_BY_ID_PENDING,
  GET_USER_BY_ID_FULFILLED,
  GET_USER_BY_ID_REJECTED,
  UPDATE_USER_BY_ID_PENDING,
  UPDATE_USER_BY_ID_FULFILLED,
  UPDATE_USER_BY_ID_REJECTED,
  DELETE_USER_BY_ID_PENDING,
  DELETE_USER_BY_ID_FULFILLED,
  DELETE_USER_BY_ID_REJECTED
} from './mutationTypes'

import usersApi from '@/api/usersApi'

const state = () => ({
  getUserById: {
    user: {},
    error: null,
    isPending: false
  },
  updateUserById: {
    user: {},
    error: null,
    isPending: false
  },
  deleteUserById: {
    error: null,
    isPending: false
  }
})

const actions = {
  async getUserById({ commit, rootState }, userId) {
    const token = rootState.auth.token
  
    commit(GET_USER_BY_ID_PENDING)
    return await usersApi
      .getUserById(token, userId)
      .then(response => {
        commit(GET_USER_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_USER_BY_ID_REJECTED, error)
      })
  },

  async updateUserById({ commit, rootState }, userId) {
    const token = rootState.auth.token

    commit(UPDATE_USER_BY_ID_PENDING)
    return await usersApi
      .updateUserById(token, userId)
      .then(response => {
        commit(UPDATE_USER_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(UPDATE_USER_BY_ID_REJECTED, error)
      })
  },

  async deleteUserById({ commit, rootState }, userId) {
    const token = rootState.auth.token

    commit(DELETE_USER_BY_ID_PENDING)
    return await usersApi
      .deleteUserById(token, userId)
      .then(() => {
        commit(DELETE_USER_BY_ID_FULFILLED)
      })
      .catch(error => {
        commit(DELETE_USER_BY_ID_REJECTED, error)
      })
  }
}

const mutations = {
  // Get user by id
  [GET_USER_BY_ID_PENDING](state) {
    state.getUserById.user = {}
    state.getUserById.error = null
    state.getUserById.isPending = true
  },
  [GET_USER_BY_ID_FULFILLED](state, user) {
    state.getUserById.user = user.data
    state.getUserById.error = null
    state.getUserById.isPending = false
  },
  [GET_USER_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getUserById.user = {}
    state.getUserById.error = { code, message }
    state.getUserById.isPending = false
  },

  // Update user by id
  [UPDATE_USER_BY_ID_PENDING](state) {
    state.updateUserById.user = {}
    state.updateUserById.error = null
    state.updateUserById.isPending = true
  },
  [UPDATE_USER_BY_ID_FULFILLED](state, updatedUser) {
    state.updateUserById.user = updatedUser
    state.updateUserById.error = null
    state.updateUserById.isPending = false
  },
  [UPDATE_USER_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.updateUserById.user = {}
    state.updateUserById.error = { code, message }
    state.updateUserById.isPending = false
  },

  // Delete user by id
  [DELETE_USER_BY_ID_PENDING](state) {
    state.deleteUserById.error = null
    state.deleteUserById.isPending = true
  },
  [DELETE_USER_BY_ID_FULFILLED](state) {
    state.deleteUserById.error = null
    state.deleteUserById.isPending = false
  },
  [DELETE_USER_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.deleteUserById.error = { code, message }
    state.deleteUserById.isPending = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

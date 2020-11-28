import {
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED,
  BUSINESS_REGISTER_PENDING,
  BUSINESS_REGISTER_FULFILLED,
  BUSINESS_REGISTER_REJECTED,
  SET_BUSINESS_LOCATION,
  SET_BUSINESS_SERVICES,
  SET_BUSINESS_OPENING_HOURS,
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  FACEBOOK_LOGIN_FULFILLED,
  LOGIN_REJECTED,
  SET_REGISTER_LINK,
  LOGOUT,
  SET_LOCAL_DATA,
  SET_FB_DATA
} from './mutationTypes'

import authApi from '@/api/authApi'

const state = () => ({
  token: null,
  user: {},
  registerLink: null,
  register: {
    error: null,
    isPending: false
  },
  businessRegister: {
    error: null,
    isPending: false,
    businessLocation: '',
    businessServices: [],
    businessOpeningHours: ''
  },
  login: {
    error: null,
    isPending: false
  },
  facebookLogin: {
    fbData: {}
  }
})

const getters = {
  isAuthenticated: state => !!state.token
}

const actions = {
  async register({ commit }, data) {
    commit(REGISTER_PENDING)
    return await authApi
      .register(data)
      .then(response => {
        commit(REGISTER_FULFILLED, response)
      })
      .catch(error => {
        commit(REGISTER_REJECTED, error)
      })
  },

  async businessRegister({ state, commit }, data) {
    const token = state.token

    commit(BUSINESS_REGISTER_PENDING)
    return await authApi
      .businessRegister(token, data)
      .then(() => {
        commit(BUSINESS_REGISTER_FULFILLED)
      })
      .catch(error => {
        commit(BUSINESS_REGISTER_REJECTED, error)
      })
  },

  setRegisterLink({ commit }, link) {
    commit(SET_REGISTER_LINK, link)
  },

  setBusinessLocation({ commit }, data) {
    commit(SET_BUSINESS_LOCATION, data)
  },

  setBusinessServices({ commit }, data) {
    commit(SET_BUSINESS_SERVICES, data)
  },

  setBusinessOpeningHours({ commit }, data) {
    commit(SET_BUSINESS_OPENING_HOURS, data)
  },

  async login({ commit }, data) {
    commit(LOGIN_PENDING)
    return await authApi
      .login(data)
      .then(response => {
        commit(LOGIN_FULFILLED, response)
      })
      .catch(error => {
        commit(LOGIN_REJECTED, error)
      })
  },

  async loginWithFacebook({ commit }, data) {
    commit(LOGIN_PENDING)
    return await authApi
      .fbAuth(data)
      .then(response => {
        commit(LOGIN_FULFILLED, response)
      })
      .catch(error => {
        commit(LOGIN_REJECTED, error)
      })
  },

  setFbData({ commit }, data) {
    commit(SET_FB_DATA, data)
  },

  logout({ commit }) {
    commit(LOGOUT)
  },

  setLocalData({ commit }, data) {
    commit(SET_LOCAL_DATA, data)
  }
}

const mutations = {
  // Register
  [REGISTER_PENDING](state) {
    state.register.error = null
    state.register.isPending = true
  },

  [REGISTER_FULFILLED](state, response) {
    const { token, userId: id } = response.data.response
    localStorage.setItem('authToken', token)
    localStorage.setItem('uId', id)
   
    state.token = token
    state.user = { id }
    state.register.error = null
    state.register.isPending = false
  },

  [REGISTER_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.register.error = { code, message }
    state.register.isPending = false
  },

  // Business register
  [BUSINESS_REGISTER_PENDING](state) {
    state.businessRegister.error = null
    state.businessRegister.isPending = true
  },

  [BUSINESS_REGISTER_FULFILLED](state) {
    state.businessRegister.error = null
    state.businessRegister.isPending = false
  },

  [BUSINESS_REGISTER_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.businessRegister.error = { code, message }
    state.businessRegister.isPending = false
  },

  // Set business data
  [SET_BUSINESS_LOCATION](state, data) {
    state.businessRegister.businessLocation = data
  },

  [SET_BUSINESS_SERVICES](state, data) {
    state.businessRegister.businessServices = data
  },

  [SET_REGISTER_LINK](state, link) {
    state.registerLink = link
  },

  [SET_BUSINESS_OPENING_HOURS](state, data) {
    state.businessRegister.businessOpeningHours = data
  },

  // Login
  [LOGIN_PENDING](state) {
    state.login.error = null
    state.login.isPending = true
  },

  [FACEBOOK_LOGIN_FULFILLED](state, response) {
    const { accessToken, userID: id } = response.authResponse
    localStorage.setItem('authToken', accessToken)
    localStorage.setItem('uId', id)

    state.token = accessToken
    state.user = { id }
    state.login.error = null
    state.login.isPending = false
  },

  [LOGIN_FULFILLED](state, response) {
    const { token, userId, userRole, stylistId} = response.data.response
    localStorage.setItem('authToken', token)
    localStorage.setItem('uId', userId)
    localStorage.setItem('stylistId', stylistId)

    state.token = token
    state.user = response.data.response
    state.login.error = null
    state.login.isPending = false
  },

  [LOGIN_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.login.error = { code, message }
    state.login.isPending = false
  },
  
  [SET_LOCAL_DATA](state, data) {
    state.token = data.localToken
  },

  // Logout
  [LOGOUT](state) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('uId')
    state.token = ''
    state.user = {}
  },

  // FACEBOOK DATA
  [SET_FB_DATA](state, data) {
    state.name = data.name
    state.facebookLogin.fbData = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

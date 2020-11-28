import {
  CREATE_LOCATION_PENDING,
  CREATE_LOCATION_FULFILLED,
  CREATE_LOCATION_REJECTED,
  GET_LOCATION_BY_ID_PENDING,
  GET_LOCATION_BY_ID_FULFILLED,
  GET_LOCATION_BY_ID_REJECTED,
  GET_ADDRESS_BY_COORDS_FULFILLED,
  SET_GOOGLE_ADDRESS_COMPONENTS,
  GET_ADDRESS_BY_COORDS_REJECTED,
  SET_GOOGLE_COORDS
} from './mutationTypes'

import locationsApi from '@/api/locationsApi'

const state = () => ({
  createLocation: {
    location: {},
    error: null,
    isPending: false
  },
  getLocationById: {
    location: {},
    error: null,
    isPending: false
  },
  googleAddress: {
    addressComponents: null,
    error: null,
    coordsFromForm: null
  }
})

const actions = {
  async createLocation({ commit, rootState }, data) {
    const token = rootState.auth.token

    commit(CREATE_LOCATION_PENDING)
    return await locationsApi
      .createLocation(token, data)
      .then(response => {
        commit(CREATE_LOCATION_FULFILLED, response)
      })
      .catch(error => {
        commit(CREATE_LOCATION_REJECTED, error)
      })
  },

  async getLocationById({ commit, rootState }, locationId) {
    const token = rootState.auth.token

    commit(GET_LOCATION_BY_ID_PENDING)
    return await locationsApi
      .getLocationById(token, locationId)
      .then(response => {
        commit(GET_LOCATION_BY_ID_FULFILLED, response)
      })
      .catch(error => {
        commit(GET_LOCATION_BY_ID_REJECTED, error)
      })
  },
  async getAddress({ commit }, coords) {
    
    return await locationsApi
      .getAddressByCoords(coords)
      .then(response => {
        commit(SET_GOOGLE_ADDRESS_COMPONENTS, response.data.results[0])
      })
      .catch(error => {
        commit(GET_ADDRESS_BY_COORDS_REJECTED, error)
      })
  },
  setAddress({ commit }, data) {
    commit(SET_GOOGLE_ADDRESS_COMPONENTS, data)
  },
  setCoords({ commit }, data) {
    commit(SET_GOOGLE_COORDS, data)
  }
}

const mutations = {
  [SET_GOOGLE_COORDS](state, coords) {
    state.googleAddress.coordsFromForm = coords
  },  
  [SET_GOOGLE_ADDRESS_COMPONENTS](state, data) {
    state.googleAddress.addressComponents = data ? data.address_components : null
  },
  [GET_ADDRESS_BY_COORDS_REJECTED](state, error) {
    state.googleAddress.error = error
  },
  // Create new location
  [CREATE_LOCATION_PENDING](state) {
    state.createLocation.location = {}
    state.createLocation.error = null
    state.createLocation.isPending = true
  },
  [CREATE_LOCATION_FULFILLED](state, createdLocation) {
    state.createLocation.location = createdLocation
    state.createLocation.error = null
    state.createLocation.isPending = false
  },
  [CREATE_LOCATION_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.createLocation.location = { code, message }
    state.createLocation.error = error
    state.createLocation.isPending = false
  },

  // Get location by id
  [GET_LOCATION_BY_ID_PENDING](state) {
    state.getLocationById.location = {}
    state.getLocationById.error = null
    state.getLocationById.isPending = true
  },
  [GET_LOCATION_BY_ID_FULFILLED](state, location) {
    state.getLocationById.location = location
    state.getLocationById.error = null
    state.getLocationById.isPending = false
  },
  [GET_LOCATION_BY_ID_REJECTED](state, error) {
    const { code, message } = error.response.data

    state.getLocationById.location = { code, message }
    state.getLocationById.error = error
    state.getLocationById.isPending = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

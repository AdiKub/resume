import {
  CREATE_APPOINTMENT,
  CREATE_APPOINTMENT_FULFILLED,
  CREATE_APPOINTMENT_REJECTED,
  SET_DATE_FROM_MODAL,
  SET_TIME_FROM_MODAL
} from './mutationTypes'

import appointmentsApi from '@/api/appointmentsApi'

const state = () => ({
  newAppointment: {
    error: null,
  },
  modalDate: null,
  modalTime: null
})

const actions = {
  async createAppointment({ commit, rootState }, data) {
    const token = rootState.auth.token

    return await appointmentsApi
      .setNewAppointment(token, data)
      .then(response => {
        commit(CREATE_APPOINTMENT_FULFILLED, response)
      })
      .catch(error => {
        commit(CREATE_APPOINTMENT_REJECTED, error)
      })
  },
  setDateFromModal({commit}, modalDate) {
    commit(SET_DATE_FROM_MODAL, modalDate)
  },
  setTimeFromModal({commit}, modalDate) {
    commit(SET_TIME_FROM_MODAL, modalDate)
  }
}

const mutations = {
  // Create new location
  [CREATE_APPOINTMENT_FULFILLED](state, response) {
    state.newAppointment = response.data
  },
  [SET_DATE_FROM_MODAL](state, modalDate) {
    state.modalDate = modalDate
  },
  [SET_TIME_FROM_MODAL](state, modalTime) {
    state.modalTime = modalTime
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

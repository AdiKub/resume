import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import users from './modules/users'
import stylists from './modules/stylists'
import businessCategories from './modules/businessCategories'
import serviceCategories from './modules/serviceCategories'
import serviceTypes from './modules/serviceTypes'
import services from './modules/services'
import locations from './modules/locations'
import openHours from './modules/openHours'
import reviews from './modules/reviews'
import appointments from './modules/appointments'
import stripe from './modules/stripe'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    users,
    stylists,
    businessCategories,
    serviceCategories,
    serviceTypes,
    services,
    locations,
    openHours,
    reviews,
    appointments,
    stripe
  }
})

import Vue from 'vue'
import VueRouter from 'vue-router'

import { requiresAuthMiddleware } from './middlewares'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeLayout
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  requiresAuthMiddleware(to, from, next)
})

export default router

import store from '@/store'

// export const requiresAuthMiddleware = (to, from, next) => {

//   const localToken = localStorage.getItem('authToken')
//   const isNotAuthenticated = store.state.auth.token || localStorage.getItem('authToken')
//   const isAuthRequired = to.matched.some(nextRoute => nextRoute.meta.isAuthRequired)

//   if (isAuthRequired && !isNotAuthenticated && !localToken) {
//     next('/')
//   } else {
//     next()
//   }
// }

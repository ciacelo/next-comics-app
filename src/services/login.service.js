import http from './config.service'

export default {

  login: (data) => {
    return http.post('/user/login/:email', data)
  },

  register: (data) => {
    return http.post('/user/register/', data)
  },

  isAuth: () => {
    return http.get('/user/profile')
  }
}

import http from './config.service'
/* eslint-disable */

export default {

  listarUserHq: (data) => {  
    return http.get('/user/hq/'+data)
  },

  addUserHq: (data, user) => {
    return http.put('/user/hq/'+user , data)
  },

  removeHq: (data, user) => {
    return http.patch('/user/hq/'+user, data)
  },

  recomend: (user) => {
    return http.get('/user/recomendacao/'+user)
  }
}
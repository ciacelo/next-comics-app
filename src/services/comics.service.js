import http from './config.service'
/* eslint-disable */

export default {

  listar: () => {
    return http.get('/comic')
  },

  addComic: (data) => {
    return  http.post('/comic', data)
  },

  listarRandom: () => {
    return http.get('/comic/random')
  }
}

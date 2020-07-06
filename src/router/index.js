import Vue from 'vue'
import Router from 'vue-router'
import Root from '../views/Root'
import RandomRoot from '../components/RandomRoot'
import RegisterUser from '../views/RegisterUser'
import LoginUser from '../views/Login'
import UserRoot from '../views/UserRoot'
import AdmRoot from '../views/AdmRoot'
import Home from '../views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/teste',
      name: 'Root',
      component: Root
    },

    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/register',
      name: 'Register',
      component: RegisterUser
    },

    {
      path: '/login',
      name: 'Login',
      component: LoginUser,
      meta: {auth: false}
    },

    {
      path: '/random',
      name: 'RandomRoot',
      component: RandomRoot
    },

    {
      path: '/user',
      name: 'UserRoot',
      component: UserRoot
    },

    {
      path: '/adm',
      name: 'AdmRoot',
      component: AdmRoot
    }
  ]
})

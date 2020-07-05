import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import RandomRoot from '@/components/RandomRoot'
import RegisterUser from '@/components/RegisterUser'
import LoginUser from '@/components/Login'
import UserRoot from '@/components/UserRoot'
import AdmRoot from '@/components/AdmRoot'
import Home from '@/components/Home'

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

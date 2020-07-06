<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="[' ']"
        :style="{ lineHeight: '64px' }"
      >
        <a-button @click="register">Register</a-button>
        <a-button @click="login">Login</a-button>
        <a-button @click="hqPrincipal">Principal</a-button>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <a-row>
          <component v-bind:is="schema"></component>
        </a-row>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant
    </a-layout-footer>
  </a-layout>
</template>

<script>
/*eslint-disable*/
import Vue from 'vue'
import Antd from 'ant-design-vue'
import CardsListVue from './CardsList.vue'
import CardsListRandom from './CardsListRandom.vue'
import RegisterUser from '../views/RegisterUser'
import router from '../router/index.js'

Vue.use(Antd)

export default {
  name: 'RandomRoot',
  data () {
    return {
      schema:'CardsListRandom',
      msg: 'Olá cara.',
      ModalText: 'Content of the modal', 
      visible: false,
      confirmLoading: false
    }
  },

  components: { CardsListVue, RegisterUser, CardsListRandom },

  methods: {
    register: () => {
      router.push({name: 'Register'})
    },

    login: () => {
      router.push({name: 'Login'})
    },

    hqPrincipal: () => {
      router.push({name: 'Root'})
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #components-layout-demo-top .logo {
    width: 120px;
    height: 31px;
    background: rgba(255,255,255,.2);
    margin: 16px 24px 16px 0;
    float: left;
  }

  #components-layout-demo-top a-button {
    margin-right: 5px;
  }

</style>

<template>
  <div id="teste" >
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo" />
      <template v-if="visible">
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="[' ']"
        :style="{ lineHeight: '64px' }"
      >
        <a-button @click="register">Register</a-button>
        <a-button @click="login">Login</a-button>
        <a-button @click="hqRandom">Minha biblioteca</a-button>
      </a-menu>
      </template>
      <template v-else>
        <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="[' ']"
        :style="{ lineHeight: '64px' }"
        >
          <a-button @click="hqRandom">Minha biblioteca</a-button>
        </a-menu>
      </template>    </a-layout-header>
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
  </div>
</template>

<script>
/*eslint-disable*/
import Vue from 'vue'
import Antd from 'ant-design-vue'
import Logar from '../services/login.service'
import CardsListVue from './CardsList.vue'
import CardsListRandom from './CardsListRandom.vue'
import RegisterUser from './RegisterUser.vue'
import router from '../router/index.js'

Vue.use(Antd)

export default{
template: '#teste',
name: 'Root',
  data () {

    return {
      n:'A',
      schema:'CardsListVue',
      msg: 'Olá cara.',
      ModalText: 'Content of the modal', 
      visible: true,
      confirmLoading: false,
      interval:null
      }
  },

  components: { CardsListVue, RegisterUser, CardsListRandom },
   
  
  
  created() {
   this.isAuth

  },
  mounted() {
       
  },
  beforeMount() {
    
  }, 
  methods: {

    isAuth: () => {
      Logar.isAuth().then(resp=>{
        alert('logado')
        this.visible=true
      }).catch(resp=>{
        alert('login errado')
        this.visible=false

        })
    return
    },

    updateVisible: function () {
      console.log(this.$el.textContent)
      this.$nextTick(() => {
        console.log(this.$el.textContent)
      })
            this.$watch()

    },

    register: () => {
      router.push({name: 'Register'})
    },

    login: () => {
      router.push({name: 'Login'})      
    },

    hqRandom: () => {
      router.push({name: 'Home'})
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #components-layout-demo-top .logo {
    background-image: url('../assets/logo-next.png');
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    float: left;
  }

  #components-layout-demo-top a-button {
    margin-right: 5px;
  }

</style>

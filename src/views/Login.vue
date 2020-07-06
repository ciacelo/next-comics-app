<template>
  <div>
    <h1 class="font-icon icon">
            Next
            <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="79.924" height="28.328" viewBox="0 0 79 28">
                    <text id="next" class="cls-1" x="-3.067" y="27.604">next</text>
                </svg>
            </a>
            </h1>
    <div>
    <br><br><br><br><br><br><br><br>
    <a-row type="flex" justify="space-around">
      <a-row justify="end">
        <a-col :span="8"></a-col>
      </a-row>
      <a-col :span="6"></a-col>
      <a-col :span="9">
        <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
      >
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            { rules: [{ required: true, message: 'Por favor insira seu e-mail!' }] }
          ]"
          placeholder="Username"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Por favor insira sua senha!' }] }
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            }
          ]"
        >
          Remember me
        </a-checkbox>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          Log in
          <i class="fa fa-sign-in-alt"></i>
        </a-button>
        Or <a href="/#/register">
          register now
        </a>
      </a-form-item>
    </a-form>
        </a-col>
        <a-col :span="8"></a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Logar from '../services/login.service'
import router from '../router/index.js'
import Home from './Home.vue'

const STORAGE_KEY = 'user-storage'

export default {

  name: 'login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },

  beforeCreate () {
    this.form = this.$form.createForm(this);
  },

  methods: {

    handleSubmit (e) {
      e.preventDefault()
      /*this.$auth.login({
        params: {auth: this.user},
        success: function () {
          console.log('Usuário logado com sucesso.')
        },
        error: function () {
          console.log('Usuário e/ou senha inválidos.')
        },
        redirect: '/'
      })*/
      this.form.validateFields((err, data) => {
        if (!err) {
          Logar.login(data).then(response => {
            console.log(response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('STORAGE_KEY2', response.data.user.email)
            localStorage.setItem('isAuthed', true)
            //if(response.data.user.email === 'ciacelo@hotmail.com'){
              //this.$router.push(this.$route.query.redirect || '/adm')
            //}else{
            this.$router.push(this.$route.query.router || '/')
            //}
          }).catch(response => {
            console.log(response)
            alert("E-mail de usuário ou senha incorretos! Tente novamente...")
          })
        }
      });
    },
  },

  watch: {
    input: (data) => {
      if(localStorage()){
        localStorage.setItem('token', data)
      }
    }
  }
};
</script>
<style>
div{
  height: 100%;
  background-color: rgb(20, 20, 20);
}

a{
  color: #807bc1;
}

a:hover {
  color: #17487d;
  text-decoration: double;
}

.font-icon{
    font-size: 0;
}

.icon a{
    position: absolute;
    margin: 36px 35px 22px 41%;
    text-shadow: initial;
}

.cls-1 {
    font-size: 36px;
    fill: red;
    font-family: "Microsoft YaHei",serif;
    font-weight: bold;
}

.ant-checkbox-wrapper + span, .ant-checkbox + span {
    /* padding-left: 8px; */
    padding-right: 8px;
    color: white;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
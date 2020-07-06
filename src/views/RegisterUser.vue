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
    <br><br><br><br><br><br>
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="9">
        <a-form
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item
      v-bind="formItemLayout"
      label="E-mail"
    >
      <a-input
        v-decorator="[
          'email',
          {
            rules: [{
              type: 'email', message: 'E-mail não é válido',
            }, {
              required: true, message: 'Por favor digite seu E-mail',
            }]
          }
        ]"
      />
    </a-form-item>
     <a-form-item
      v-bind="formItemLayout"
    >
      <span slot="label">
        Name&nbsp;
        <a-tooltip title="Nome de usuário?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
        v-decorator="[
          'name',
          {
            rules: [{ required: true, message: 'Por favor digite seu nome!', whitespace: true }]
          }
        ]"
      />
    </a-form-item>
     <a-form-item
      v-bind="formItemLayout"
      label="Password"
    >
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="Confirm Password"
    >
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-checkbox
        v-decorator="['agreement', {valuePropName: 'checked'}]"
      >
        I have read the <a href="">
          agreement
        </a>
      </a-checkbox>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button
        type="primary"
        html-type="submit"
      >
        Register
      </a-button>
    </a-form-item>
  </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/* eslint-disable */
import Logar from '../services/login.service'

export default {
  data () {
    return {
      usuario: {
        name: '',
        email: '',
        password: ''
      },
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },

  methods: {
    handleSubmit (e) {  
      this.form.validateFields( (error, data) => {
        if(!error){
          Logar.register(data)
            .then(resposta => {
              alert('Usuário registrado.')
              this.$router.push('/')
            }).catch( e => console.log(e) )
        }
      }) 
    },
    handleConfirmBlur  (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Alguma das senhas digitadas está inconsistente!');
      } else {
        callback();
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },

  watch: {
    todos: {
      handler () {
        console.log('todos mudou!')
        localStorage.setItem('todo', JSON.stringify(this.todos));
      },
      deep: true,
    },
  },

  mounted () {
    console.log('App montado!');
    if (localStorage.getItem('todos')) this.todos = JSON.parse
    (localStorage.getItem('todos'));
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

.ant-form {
    width: 115%;
}

.ant-form-item-label label {
    color: rgb(249, 249, 249);
}

.ant-checkbox-wrapper + span, .ant-checkbox + span {
    padding-left: 8px;
    color: white;
    padding-right: 8px;
}
</style>

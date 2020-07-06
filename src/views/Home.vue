<template>
  <div>
    <header
      class="header"
      :style="{ backgroundImage: 'linear-gradient(rgb(0, 0, 0), rgba(0, 0, 0, 0.64), rgba(0, 0, 0, 0.98)), url(' + thumb + ')', backgroundSize: 'cover', height: '95vh', backgroundPosition: 'top' }"
    >
      <h1 class="font-zero logo">
        Next
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="79.924"
            height="28.328"
            viewBox="0 0 79 28"
          >
            <text id="next" class="cls-1" x="-3.067" y="27.604">next</text>
          </svg>
        </a>
      </h1>
      <nav class="menu">
        <ul>
          <li>
            <a href>Inicio</a>
          </li>
          <li>
            <a href="#mangas">Mangás</a>
          </li>
          <li>
            <a href>Adicionados recentemente</a>
          </li>
          <ul id="menu-login" v-if="visible">
            <li>
              <a href="/#/login">Login</a>
            </li>
          </ul>
          <ul id="menu-lista" v-else>
            <li>
              <a href="/#/user">Minha lista</a>
            </li>
            <li>
              <a @click="sigOut" href="/">Sair</a>
            </li>
          </ul>
        </ul>
      </nav>
      <h1 class="title-slide">{{card.title}}</h1>
      <a :href="''+ card.description" class="leia-agora">
        <div class="bt-leia-agora">
          <svg
            version="1.1"
            id="play-arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 124.512 124.512"
          >
            <g>
              <path
                d="M113.956,57.006l-97.4-56.2c-4-2.3-9,0.6-9,5.2v112.5c0,4.6,5,7.5,9,5.2l97.4-56.2 C117.956,65.105,117.956,59.306,113.956,57.006z"
              />
            </g>
          </svg>
          <h2>Leia agora</h2>
        </div>
      </a>
    </header>
    <section>
      <header class="page-head">
        <h1>Sugestão do Dia</h1>
      </header>
      <ul class="items random">
        <li class="card2" id="cards" v-bind="card2">
          <div class="bg-img" v-bind:style="{ backgroundImage: 'url(' + `${ imagesUrlSugestion }` + ')'}"></div>
          <button type="button" class="btn btn-outline-dark" id="invisible" v-if="visible">+</button>
          <button type="button" class="btn btn-outline-dark" @click="()=>addHq(card2)" v-else>+</button>
          <a :href="''+ card2.description">
            <div class="content">
              <h2>{{ card2.title }}</h2>
            </div>
          </a>
        </li>
      </ul>
    </section>
    <section id="mangas">
      <header class="page-head-alta">
        <h1>Mangás</h1>
      </header>
      <ul class="items items-alta">
        <li class="card" id="cards" v-for="(card, index) in schema" :key="card.id">
          <div class="bg-img" v-bind:style="{ backgroundImage: 'url(' + `${ imagesUrl[index] }` + ')' }"></div>
          <button type="button" class="btn btn-outline-dark" id="invisible" v-if="visible">+</button>
          <button type="button" class="btn btn-outline-dark" @click="()=>addHq(card)" v-else>+</button>
          <a :href="''+ card.description">
            <div class="content">
              <h2>{{ card.title }}</h2>
            </div>
          </a>
        </li>
      </ul>
    </section>
    <footer>
      <ul>
        <li class="copy">@2019 - 2019 next.inc</li>
      </ul>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
import Comics from "../services/comics.service";
import Logar from "../services/login.service";
import User from "../services/user.service";
import router from "../router/index.js";
import coverImg from "../assets/slide.png"

export default {
  data() {
    return {
      user: {
        token: "",
        email: ""
      },
      visible: true,
      schema: "",
      card: [],
      card2: {},
      thumb: coverImg,
      temp: null,
      imagesUrl: [],
      imagesUrlSugestion: ""
    };
  },

  mounted: function() {
    Comics.listar()
      .then(async response => {
        let data = await response.data;
        let randomItem = Math.floor(Math.random() * data.length);
        (this.schema = data),
          (this.card = data),
          (this.card2 = data[randomItem]);
          console.log(data)
          let imgs = await new Promise((resolve, reject) => {
            try {
              data.map(async item => {
                let image = await item.images[0].publicPath;
                this.imagesUrl.push(image);
              })
              resolve("success");
            } catch (error) {
              reject(error);
            }
          })
          (this.imagesUrlSugestion = this.card2.images[0].publicPath);
          // console.log(response.data[0].images[0].publicPath)
      })
      .catch(error => console.log(error)),
      // Comics.listarRandom()
      // .then(resposta => (this.card = resposta.data))
      // .catch(error => console.log(error))

      // Comics.listarRandom()
      // .then(resposta => (this.card2 = resposta.data))
      // .catch(error => console.log(error))

      /*Logar.isAuth()
            .then(resposta => (this.temp = resposta.data.success))
            .catch(this.temp = false)
            console.log(this.temp)
            if(this.temp){
                console.log('if')
                this.temp = false
                this.$nextTick(() => {
                this.visible = false
            })
            }else{
                console.log('else')
                this.temp = true
                this.$nextTick(() => {
                this.visible = true
                })
            }*/

      (this.user.token = localStorage.getItem("token"));
    this.user.email = localStorage.getItem("STORAGE_KEY2");
    this.temp = localStorage.getItem("isAuthed");

    if (this.temp) {
      this.visible = false;
      this.$nextTick(() => {
        this.visible = false;
      });
    } else {
      this.visible = true;
      this.$nextTick(() => {
        this.visible = true;
      });
    }
  },

  methods: {
    // let temp = false
    isAuth: () => {
      Logar.isAuth()
        .then(resp => {
          localStorage.setItem("isAuthed", true);
          /*alert('logado')
            console.log("fine")
            this.visible = false;
            temp = false;*/
        })
        .catch(resp => {
          localStorage.setItem("isAuthed", false);
          alert(resp);
        });
    },

    sigOut: () => {
      localStorage.clear("isAuthed");
      localStorage.clear("token");
      localStorage.clear("STORAGE_KEY2");
    },

    addHq: card => {
      console.log(card);
      User.addUserHq(card, localStorage.getItem("STORAGE_KEY2"));
    },

  },

  computed: {
    load: function() {
      console.log("computed");
      this.$nextTick();
    }
  }

  /*created: function() {
    this.updateMessage()
  }*/
};
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
  color: white;
}

.font-zero {
  font-size: 0;
}

.cls-1 {
  font-size: 36px;
  fill: red;
  font-family: "Microsoft YaHei", serif;
  font-weight: bold;
}

h1,
h2,
li {
  font-family: "Fira Sans", sans-serif;
}
body {
  background-color: black;
  color: white;
  text-shadow: 1px 1px 4px rgb(0, 0, 0);
}
.header {
  background-image: linear-gradient(
      rgb(0, 0, 0),
      rgba(0, 0, 0, 0.64),
      rgba(0, 0, 0, 0.98)
    ),
    url("../assets/slide.png");
  background-size: cover;
  height: 95vh;
  background-position: top;
}
.logo a {
  position: absolute;
  margin: 30px 20px 20px 3%;
  text-shadow: initial;
}
.menu {
  flex-grow: 10;
}
.menu ul {
  margin-top: 30px;
  margin-left: 130px;
  display: flex;
}
.menu li {
  font-size: 0.9em;
  margin: 1% 1%;
}
.menu li a:hover {
  color: rgba(255, 255, 255, 0.7);
  transition: 0.3s ease-in;
}

h1.title-slide {
  margin-top: 200px;
  margin-left: 68px;
  margin-right: 35%;
  font-size: 4.5vw;
  color: white;
  text-shadow: 0px 4px 5px #000;
}

.menu ul#menu-login {
  margin-left: auto !important;
}

.menu ul#menu-login {
  margin-left: 50% !important;
  margin-top: 0px !important;
}

.menu ul#menu-login a {
  margin: 10% !important;
  white-space: nowrap;
}

.menu ul#menu-login li {
  margin: 0px 10%;
}

.menu ul#menu-lista {
  margin-left: 45% !important;
  margin-top: 0px !important;
}

.menu ul#menu-lista a {
  margin: 10% !important;
  white-space: nowrap;
}

.menu ul#menu-lista li {
  margin: 0px 10%;
}

.logo-cover {
  background-image: url(/static/img/logo-next.f024d2b.png);
  background-repeat: no-repeat;
  height: 280px;
  width: 120px;
  /* background-color: red; */
  position: absolute;
  top: -2%;
  background-size: 108px auto;
}
.bt-leia-agora {
  display: flex;
  align-items: center;
  position: absolute;
  margin-top: 12px;
  left: 90px;
  width: 150px;
  justify-content: center;
  padding: 10px 20px 10px 20px;
  background: rgba(75, 75, 75, 0.5);
  border-radius: 5px;
}

.bt-leia-agora h2 {
  color: white;
}

.bt-leia-agora:hover {
  background-color: rgba(75, 75, 75, 0.85);
  transition: 0.3s ease-in;
}
.bt-leia-agora #play-arrow {
  fill: white;
  margin-right: 10px;
}

.page-head h1 {
  color: white;
  font-size: 1.2em;
  position: absolute;
  top: 87%;
  margin-left: 10%;
}

.page-head-alta h1 {
  color: white;
  font-size: 1.2em;
  position: absolute;
  margin-left: 10%;
  margin-top: 121px;
}
.items {
  position: relative;
  top: 50%;
  left: 50%;
  text-align: center;
  width: 90%;
  transform: translateY(-10%) translateX(-52%);
}

.items.random {
  transform: translateY(-5%) translateX(-87%);
}

.items-alta {
  transform: translateY(5%) translateX(-52%);
}

.items li {
  position: relative;
  vertical-align: middle;
  display: inline-block;
  list-style: none;
  width: 22.5%;
  height: 31vw;
  background-color: black;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.items li#cards {
  margin: 5px;
}

.items li .bg-img {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center top;
}

.items li .bg-img:hover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center top;
}

.items li:hover {
  transition-delay: 0ms;
  width: 27.5%;
  /*height: 32vw;*/
}
.items li:hover a .content {
  transform: translateY(-2%) translateX(-50%);
  transition-delay: 0.1ms;
  opacity: 1;
}
.items li a {
  color: white;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  z-index: 2;
}
.items li a .content {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateY(100%) translateX(-50%);
  transition-duration: 1s;
  opacity: 0;
  padding: 0% 60% 11% 60%;
  width: 214%;
}
.items li a .content h2 {
  font-weight: 300;
  color: white;
  font-size: 2vw;
}

.btn {
  margin-top: 52%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  z-index: 3;
  border-radius: 5.25rem;
}

.btn#invisible {
  z-index: 0;
}

.btn-outline-dark#invisible {
  color: #fbf9f900;
  border-color: #00000000;
  background-color: #04040400;
}

.btn-outline-dark {
  color: #fbf9f9;
  border-color: #0000002e;
  background-color: #0404047d;
}

footer {
  margin-top: 12%;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
}
footer ul a {
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.6);
  margin: 30px;
  line-height: 1.8em;
  text-shadow: none;
}
.copy {
  font-size: 0.8em;
  margin: 30px 30px;
  color: rgba(255, 255, 255, 0.6);
}
</style>

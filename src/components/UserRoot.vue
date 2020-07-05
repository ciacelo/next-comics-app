<template>
    <div id="userroot">
       <div>
           <h1 class="font-zero logo">
            Next
            <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="79.924" height="28.328" viewBox="0 0 79 28">
                    <text id="next" class="cls-1" x="-3.067" y="27.604">next</text>
                </svg>
            </a>
            </h1>
            <br><br><br><br>
            <b-navbar toggleable="lg" type="dark" variant="info">

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template slot="button-content"><em>User</em></template>
                    <b-dropdown-item href="/#/" @click="signOut">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>
        </div>
        <!--<div>
            <a-row :gutter="16">
                <a-col :span="7" v-for="card in Cards" :key="card.id" class="card">
                    <a-card
                    hoverable
                    style="width: 240px"
                    >
                    <img v-html="card.cover"
                    alt="example"
                    v-bind:src= "card.cover"
                    slot="cover"
                    />
                    <a-card-meta
                    :title="card.title"
                    :description="card.description">
                    </a-card-meta>
                    <a-button @click="cardClick">Ler</a-button>
                    </a-card>
                </a-col>
            </a-row>
        </div>-->
        <section id="mangas">
                <header class="page-head-altaU">
                    <h1>Minha lista</h1>
                </header>
            <ul class="itemsU items-altaU">
                <li class="card" id="cards" v-for="card in Cards" :key="card.id">
                    <div class="bg-img" v-bind:style="{ backgroundImage: 'url(' + card.cover + ')' }"></div>
                    <button type="button" class="btn btn-outline-dark" @click="()=>removHq(card, Cards)">X</button>
                    <a :href="''+card.description">
                        <div class="content">
                            <h2>{{ card.title }}</h2>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
        <section id="recomenda">
                <header class="page-head-baixoU">
                    <h1>Recomendados</h1>
                </header>
            <ul class="itemsU items-baixoU">
                <li class="card" id="cards" v-for="card in CardsRecomend" :key="card.id">
                    <div class="bg-img" v-bind:style="{ backgroundImage: 'url(' + card.cover + ')' }"></div>
                    <button type="button" class="btn btn-outline-dark" @click="()=>addHq(card)">+</button>
                    <a :href="''+card.description">
                        <div class="content">
                            <h2>{{ card.title }}</h2>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
/* eslint-disable */
import User from '../services/user.service.js'

export default {
    name: 'UserRoot',
    data() {
        return {
            Cards: '',
            CardsRecomend: '',
            User1: {
                email: localStorage.getItem('STORAGE_KEY2')   
            }
        }
    },

    mounted () {
      console.log(localStorage.getItem('isAuthed'))  
      if(localStorage.getItem('isAuthed')){
          alert('chega ai')
      }else{
          alert('vai embora')
          window.location.href = "/"
      }  

      User.listarUserHq(this.User1.email)
      .then(resposta => (this.Cards = resposta.data) )
      .catch(error => console.log(error))

      User.recomend(localStorage.getItem('STORAGE_KEY2'))
      .then(response => (this.CardsRecomend = response.data) )
      .catch(err => console.log(err)) 

    },

    methods: {
      signOut: () => {
        localStorage.clear('isAuthed')
        localStorage.clear('token')
        localStorage.clear('STORAGE_KEY2')
      },

      removHq: (card, cards)=>{
          let index = cards.findIndex(item => card._id === item._id)
          console.log(cards)
          cards.splice(index, 1);
          User.removeHq(card, localStorage.getItem('STORAGE_KEY2'))
          console.log(cards)

      },

      addHq: (card) => {
        console.log(card)
        User.addUserHq(card, localStorage.getItem('STORAGE_KEY2'))
    }
    }
}
</script>

<style>

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section{
    display: block;
}

html {
    height: 100%;
    background-color: black;
}

body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
a{
    text-decoration: none;
    color: white;
}

  #userroot {
    width: 100%;
    height: 100%;
    background-color: #16182c;
    background-image: -webkit-gradient(linear,left top, left bottom,from(rgba(0, 0, 0, 0.7)),color-stop(rgba(0, 0, 0, 0)),to(rgba(247, 245, 245, 0.9)));
    background-image: linear-gradient(rgba(4, 4, 4, 0.7)-4%,rgba(17, 33, 150, 0.27)19%,rgb(0, 0, 0)45%);
}

  .bg-info{
    background-color: #17a2b800 !important;
  }

  .cards{
      margin: 20px;
  }

  .font-zero{
    font-size: 0;
}

.logo a{
    position: absolute;
    margin: 20px 20px 20px 3%;
    text-shadow: initial;
}

.cls-1 {
    font-size: 36px;
    fill: red;
    font-family: "Microsoft YaHei",serif;
    font-weight: bold;
}

.page-head-altaU h1 {
    color: white;
    font-size: 1.2em;
    position: absolute;
    top: 34%;
    margin-left: 10%;
}

.page-head-baixoU h1 {
    color: white;
    font-size: 1.2em;
    position: absolute;
    margin-left: 10%;
    margin-top: 303px;
}

.itemsU {
    position: relative;
    top: 50%;
    left: 50%;
    text-align: center;
    width: 90%;
    transform: translateY(-10%) translateX(-50%);
}

.items-altaU{
    transform: translateY(50%) translateX(-50%);
}

.items-baixoU {
    transform: translateY(85%) translateX(-50%);
    margin-bottom: 100px;
}

.itemsU li {
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
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

.itemsU li#cards {
    margin: 5px;
}


.itemsU li .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center top;
}

.itemsU li .bg-img:hover {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center top;
}

.itemsU li:hover {
    transition-delay: 0.0ms;
    width: 27.5%;
    /*height: 32vw;*/
}
.itemsU li:hover a .content {
    transform: translateY(-2%) translateX(-50%);
    transition-delay: 0.1ms;
    opacity: 1;
}
.itemsU li a {
    color: white;
    text-decoration: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    z-index: 2;
}
.itemsU li a .content {
    background: linear-gradient(transparent, rgba(0, 0, 0, .75));
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
.itemsU li a .content h2 {
    font-weight: 300;
    color: white;
    font-size: 2vw;
}

.btn{
    margin-top: 52%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    z-index: 3;
    border-radius: 5.25rem;
}

.btn-outline-dark {
    color: #fbf9f9;
    border-color: #0000002e;
    background-color: #0404047d;
}

.navbar-dark .navbar-nav .show > .nav-link, .navbar-dark .navbar-nav .active > .nav-link, .navbar-dark .navbar-nav .nav-link.show, .navbar-dark .navbar-nav .nav-link.active {
    color: #291818;
}
</style>

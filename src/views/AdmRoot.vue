<template>
    <div id="admroot">
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
                    <template slot="button-content"><em>Administrator</em></template>
                    <b-dropdown-item href="/#/" @click="signOut">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>
        </div>
        <section id="forms-hq">
                <header class="page-head-alta">
                    <h1>Adicionar Hq</h1>
                </header>
                <div>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group
                            id="input-group-1"
                            label="Title:"
                            label-for="input-1"
                            description=""
                        >
                            <b-form-input
                            id="input-1"
                            v-model="form.title"
                            type="text"
                            required
                            placeholder="title hq"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                            id="input-group-2"
                            label="Link do PDF:"
                            label-for="input-2"
                        >
                            <b-form-input
                            id="input-2"
                            v-model="form.description"
                            required
                            placeholder="Link"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                            id="input-group-3"
                            label="genre:"
                            label-for="input-3"
                        >
                            <b-form-select
                            id="input-3"
                            v-model="form.genre"
                            :options="genres"
                            required
                            placeholder="Genre"
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group
                            id="input-group-4"
                            label="author"
                            label-for="input-4"
                        >
                            <b-form-input
                            id="input-4"
                            v-model="form.author"
                            required
                            placeholder="Author"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                            id="input-group-5"
                            label="Cover:"
                            label-for="input-5"
                        >
                            <b-form-input
                            id="input-5"
                            v-model="form.cover"
                            required
                            placeholder="Cover"
                            ></b-form-input>
                        </b-form-group>

                        <!--<b-form-group id="input-group-6">
                            <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                            <b-form-checkbox value="me">Check me out</b-form-checkbox>
                            <b-form-checkbox value="that">Check that out</b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>-->

                        <b-button class="btn-pr" type="submit" variant="primary">Submit</b-button>
                        <b-button class="btn-re" type="reset" variant="danger">Reset</b-button>
                    </b-form>
                    <!--<b-card class="mt-3" header="Form Data Result">
                        <pre class="m-0">{{ form }}</pre>
                    </b-card>-->
                </div>
        </section>
    </div>
</template>

<script>
/* eslint-disable */
import User from '../services/user.service.js'
import Comic from '../services/comics.service.js'

export default {
    name: 'UserRoot',
    data() {
        return {
            form: {
                title: '',
                description: '',
                author: '',
                genre: null,
                cover: '',
                nota: []
            },
            genres: [{ text: 'Select One', value: null }, 'acao', 'suspense', 'comedia', 'aventura'],
            show: true,
            Cards: '',
            User1: {
                email: localStorage.getItem('STORAGE_KEY2')   
            }
        }
    },

    mounted () {
    
      if(localStorage.getItem('isAuthed')){
          alert('chega ai')
      }else{
          alert('vai embora')
          window.location.href = "/"
      }  
    },

    methods: {
        signOut: () => {
        localStorage.clear('isAuthed')
        localStorage.clear('token')
        localStorage.clear('STORAGE_KEY2')
        },

        onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))
            Comic.addComic(this.form)
            .then(resp => console.log(resp))
            .catch(err => console.log(err))

        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.title = ''
            this.form.description = ''
            this.form.author = ''
            this.form.genre = ''
            this.form.cover = ''
            this.form.nota = []
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
            this.show = true
            })
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

  #admroot {
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
    font-size: 40px;
    fill: red;
    font-family: "Microsoft YaHei",serif;
}

.page-head-alta h1 {
    color: white;
    font-size: 1.2em;
    position: absolute;
    margin-left: 10%;
    margin-top: -9%;
    margin-left: 0%;
}

#forms-hq {
    color: white;
    margin: 25%;
    margin-top: 20%;
}

.items {
    position: relative;
    top: 50%;
    left: 50%;
    text-align: center;
    width: 90%;
    transform: translateY(-10%) translateX(-50%);
}

.items-alta{
    transform: translateY(40%) translateX(-50%);
}


.items li {
    position: relative;
    vertical-align: middle;
    display: inline-block;
    list-style: none;
    width: 16.5%;
    height: 380px;
    background-color: black;
    transition-duration: 0.3s;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

.items li#cards {
    margin: 5px;
    padding: 5px;
}


.items li .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center top;
}
.items li:hover {
    transition-delay: 0.1ms;
    width: 17.5%;
    height: 400px;
}
.items li:hover a .content {
    transform: translateY(0) translateX(-50%);
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
    background: linear-gradient(transparent, rgba(0, 0, 0, .75));
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateY(100%) translateX(-50%);
    transition-duration: 1s;
    opacity: 0;
    padding: 40px 10px 10px 10px;
    width: 400px;
}
.items li a .content h2 {
    font-weight: 300;
    color: white;
    font-size: 30px;
}

.btn-pr {
    margin: 60px 0px 0px 44px;
    position: inherit;
}

.btn-re {
    margin: 60px 0px 0px 44px;
    position: inherit;
}

.navbar-dark .navbar-nav .show > .nav-link, .navbar-dark .navbar-nav .active > .nav-link, .navbar-dark .navbar-nav .nav-link.show, .navbar-dark .navbar-nav .nav-link.active {
    color: #291818;
}
</style>

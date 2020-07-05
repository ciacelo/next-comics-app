<template>
  <ul class="items">
    <li class="card" id="cards" :key="card.id">
      <div class="bg-img" v-bind:style="{ backgroundImage: 'url(' + card.cover + ')' }"></div>
      <a href="#">
        <div class="content">
          <h2>{{ card.title }}</h2>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
/* eslint-disable */
import Comics from '../services/comics.service'

export default {
    name: 'CardsListRandom',
    data () {
        return{
          card: ''
        }
    },

    mounted () {
      Comics.listarRandom()
      .then(resposta => (this.card = resposta.data))
      .catch(error => console.log(error))
    },

    methods: {
      cardClick: () => {
        window.location.href = "https://drive.google.com/file/d/1tlgLdTXFW7ekIO5GAqVjihKe4vZl2YZz/view"
      }
    }
}
</script>

<style>

</style>

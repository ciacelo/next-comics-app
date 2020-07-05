<template>
 <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="7" v-for="card in listCards" :key="card.id" class="card">
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
  </div>
</template>

<script>
/* eslint-disable */
import Comics from '../services/comics.service'

export default {
    name: 'CardsList',
    data () {
        return{
          listCards: ''
        }
    },

    mounted () {
      Comics.listar()
      .then(resposta => (this.listCards = resposta.data))
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

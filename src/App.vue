<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Data</router-link>
      |
      <router-link to="/valuation">Calculator</router-link>
    </div>

    <b-row no-gutters>
      <ticker-search class="ticker-box"></ticker-search>
    </b-row>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TickerSearch from '@/components/TickerSearch.vue'

  @Component({
    components: {
      TickerSearch
    }
  })
export default class App extends Vue {
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 1%;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .ticker-box {
    margin-bottom: 1em;
  }
</style>

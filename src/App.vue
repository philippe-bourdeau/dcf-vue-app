<template>
  <div id="app">
    <b-row no-gutters>
      <ticker-search class="ticker-box"></ticker-search>
    </b-row>
    <router-view/>
    <b-navbar fixed="bottom" variant="dark" type="dark">
      <b-navbar-nav>
        <b-nav-item class="menu-item" to="/">Historical Data</b-nav-item>
        <b-nav-item class="menu-item" to="/valuation">Intrinsic value</b-nav-item>
        <b-nav-item class="menu-item" to="/growth">Growth</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
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
    color: #2c3e50;
    margin: 1%;
  }

  .menu-item {
    font-weight: bolder;
    font-size: larger;
  }

  .ticker-box {
    margin-bottom: 1em;
  }
</style>

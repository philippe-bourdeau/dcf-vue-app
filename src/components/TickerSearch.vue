<template>
  <div>
    <b-input-group prepend="Ticker">
      <b-form-input id="ticker"
                    v-model="ticker"
                    placeholder="ex. T.CA">
      </b-form-input>
      <b-input-group-append>
        <b-button @click="setTicker" variant="info">Search</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class TickerSearch extends Vue {
    ticker: string = this.$store.state.ticker

    setTicker () {
      this.$store.commit('setTicker', this.ticker)
    }
}
</script>

<style>
</style>

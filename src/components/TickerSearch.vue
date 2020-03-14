<template>
  <div>
    <b-input-group prepend="Ticker">
      <b-form-input id="ticker"
                    v-model="ticker"
                    placeholder="ex. T:CA"
                    @keypress.enter="fetchData">
      </b-form-input>
      <b-input-group-append>
        <b-button @click="fetchData" variant="info">Search</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { each } from 'lodash'

  @Component
export default class TickerSearch extends Vue {
    ticker: string = this.$store.state.metadata.ticker

    fetchData () {
      this.$store.dispatch('fetchStatements', this.ticker).catch(
        (error) => {
          each(error.response.data.errors.ticker, (item) => {
            this.$bvToast.toast(`${item}`, {
              title: 'Invalid ticker',
              autoHideDelay: 8000,
              variant: 'warning'
            })
          })
          console.log(error.errors)
        }

      )
    }
}
</script>

<style>
</style>

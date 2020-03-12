import Vuex, { StoreOptions } from 'vuex'
import Vue from 'vue'
import { FinancialStatement } from '@/business/shapes/FinancialStatement'
import axios from 'axios'

Vue.use(Vuex)

interface RootState {
  ticker: string;
  statements: FinancialStatement[];
}

const options: StoreOptions<RootState> = {
  state: {
    ticker: '',
    statements: []
  },
  mutations: {
    setTicker (state: RootState, ticker: string) {
      state.ticker = ticker
    },
    setStatements (state, statements) {
      state.statements = statements
    }
  },
  actions: {
    fetchStatements (context) {
      axios.get(
        'http://php-docker.local:8080/raw/' + context.state.ticker
      ).then((response) => {
        context.commit('setStatements', response.data)
      }).catch((error) => {
        throw error
      })
    }
  }
}

export const store = new Vuex.Store(options)

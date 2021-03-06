import Vuex, { StoreOptions } from 'vuex'
import Vue from 'vue'
import { FinancialStatement } from '@/business/shapes/FinancialStatement'
import axios from 'axios'
import { FinancialMetadata } from '@/business/shapes/FinancialMetadata'

Vue.use(Vuex)

interface RootState {
  metadata: FinancialMetadata;
  statements: FinancialStatement[];
}

const options: StoreOptions<RootState> = {
  state: {
    metadata: new FinancialMetadata('', 0, 0),
    statements: []
  },
  getters: {
    getStatements: state => state.statements,
    getTicker: state => state.metadata.ticker
  },
  mutations: {
    setMetadata (state: RootState, { ticker, price, market_cap }) {
      state.metadata = new FinancialMetadata(
        ticker,
        price,
        market_cap
      )
    },
    setStatements (state: RootState, statements: FinancialStatement[]) {
      state.statements = statements
    }
  },
  actions: {
    fetchStatements (context, ticker) {
      return axios.get(
        `http://php-docker.local:8080/query?ticker=${ticker}`
      ).then((response) => {
        context.commit('setStatements', response.data.statements)
        context.commit('setMetadata', response.data.metadata)
      }).catch((error) => {
        throw error
      })
    }
  }
}

export const store = new Vuex.Store(options)

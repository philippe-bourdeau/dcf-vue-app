import Vuex, { StoreOptions } from 'vuex'
import Vue from 'vue'
import { FinancialStatement } from '@/business/shapes/FinancialStatement'

Vue.use(Vuex)

interface RootState {
  ticker: string;
  statements: FinancialStatement[];
}

const options: StoreOptions<RootState> = {
  state: {
    ticker: localStorage.getItem('ticker') || '',
    statements: []
  },
  mutations: {
    setTicker (state: RootState, ticker: string) {
      localStorage.setItem('ticker', ticker)
      state.ticker = ticker
    }
  }
}

export const store = new Vuex.Store(options)

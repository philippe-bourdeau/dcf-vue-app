import Vue from 'vue'
import VueRouter from 'vue-router'
import HistoryPage from '@/views/HistoryPage.vue'
import CalculatorPage from '@/views/CalculatorPage.vue'
import GrowthPage from '@/views/GrowthPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Data',
    component: HistoryPage
  },
  {
    path: '/valuation',
    name: 'Valuation',
    component: CalculatorPage
  },
  {
    path: '/growth',
    name: 'Growth',
    component: GrowthPage
  }
]

const router = new VueRouter({
  routes
})

export default router

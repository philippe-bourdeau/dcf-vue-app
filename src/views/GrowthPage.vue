<template>
  <div>
    <line-chart
      :width="500"
      :height="500"
      :chart-data="chartData"
      :chart-options="chartOptions"
    >
    </line-chart>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import LineChart from '@/components/LineChart.vue'
import { map } from 'lodash'
import { growthRate } from '@/business/math'
import { FinancialStatement } from '@/business/shapes/FinancialStatement'
import { ChartData, ChartOptions } from 'chart.js'

  @Component({
    components: {
      LineChart
    }
  })
export default class GrowthPage extends Vue {
    chartOptions: ChartOptions = {
      responsive: false,
      maintainAspectRatio: false
    }

    chartData: ChartData = {
      datasets: [],
      labels: []
    }

    get statements () {
      return this.$store.getters.getStatements
    }

    generateGrowthSeries () {
      const series = map(this.$store.getters.getStatements, (value: FinancialStatement, index: number, collection: FinancialStatement[]) => {
        if (index === 0) {
          return NaN
        }

        return growthRate(
          value.balance_sheet.equity,
          collection[index - 1].balance_sheet.equity
        )
      })

      series.shift()

      return series
    }

    generateLabels () {
      const series = map(this.$store.getters.getStatements, (value: FinancialStatement, index: number) => {
        if (index === 0) {
          return NaN
        }

        return parseInt(value.fiscal_end_date.split('-')[0], 10)
      })

      series.shift()

      return series
    }

    @Watch('statements', { deep: true })
    onStatementsChanged () {
      this.chartData.datasets = [
        {
          label: 'Equity Growth',
          data: this.generateGrowthSeries(),
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: '#861657'
        }
      ]

      this.chartData.labels = this.generateLabels()
    }

    /**
     * TODO::improve efficiency of chart refreshment (needs multiple watchers
     * and extra server request (see below) to `force refresh`
     */
    mounted () {
      const ticker = this.$store.getters.getTicker

      if (ticker !== '') {
        this.$store.dispatch('fetchStatements', ticker)
      }
    }
}
</script>

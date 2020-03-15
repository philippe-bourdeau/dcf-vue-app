<template>
  <div>
    <line-chart
      :width="width"
      :height="height"
      :chart-data="chartData"
      :chart-options="chartOptions"
    >
    </line-chart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
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
export default class CashFlowGrowthChart extends Vue {
    @Prop() width!: number
    @Prop() height!: number

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

    operatingCashFlowGrowthSeries () {
      const series = map(this.$store.getters.getStatements, (value: FinancialStatement, index: number, collection: FinancialStatement[]) => {
        if (index === 0) {
          return NaN
        }

        return growthRate(
          value.cash_flow_statement.operating_cash_flow,
          collection[index - 1].cash_flow_statement.operating_cash_flow
        )
      })

      series.shift()

      return series
    }

    capexGrowthSeries () {
      const series = map(this.$store.getters.getStatements, (value: FinancialStatement, index: number, collection: FinancialStatement[]) => {
        if (index === 0) {
          return NaN
        }

        return growthRate(
          Math.abs(value.cash_flow_statement.capex),
          Math.abs(collection[index - 1].cash_flow_statement.capex)
        )
      })

      series.shift()

      return series
    }

    FCFGrowthSeries () {
      const series = map(this.$store.getters.getStatements, (value: FinancialStatement, index: number, collection: FinancialStatement[]) => {
        if (index === 0) {
          return NaN
        }

        return growthRate(
          value.cash_flow_statement.operating_cash_flow + value.cash_flow_statement.capex,
          collection[index - 1].cash_flow_statement.operating_cash_flow + collection[index - 1].cash_flow_statement.capex
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
          label: 'Free cash flow growth',
          data: this.FCFGrowthSeries(),
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: '#00f0b5'
        },
        {
          label: 'CAPEX growth',
          data: this.capexGrowthSeries(),
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: '#ff6663'
        },
        {
          label: 'Operating Cash Flow growth',
          data: this.operatingCashFlowGrowthSeries(),
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: '#f61067'
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

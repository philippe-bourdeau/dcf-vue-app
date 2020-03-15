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
export default class IncomeChart extends Vue {
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

      revenueGrowthSeries () {
        const series = map(this.$store.getters.getStatements, (value: FinancialStatement, index: number, collection: FinancialStatement[]) => {
          if (index === 0) {
            return NaN
          }

          return growthRate(
            value.income_statement.revenue,
            collection[index - 1].income_statement.revenue
          )
        })

        series.shift()

        return series
      }

      EPSGrowthSeries () {
        const series = map(this.$store.getters.getStatements, (value: FinancialStatement, index: number, collection: FinancialStatement[]) => {
          if (index === 0) {
            return NaN
          }

          return growthRate(
            value.income_statement.earnings_per_share,
            collection[index - 1].income_statement.earnings_per_share
          )
        })

        series.shift()

        return series
      }

      equityGrowthSeries () {
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

      netIncomeGrowthSeries () {
        const series = map(this.$store.getters.getStatements, (value: FinancialStatement, index: number, collection: FinancialStatement[]) => {
          if (index === 0) {
            return NaN
          }

          return growthRate(
            value.income_statement.net_income,
            collection[index - 1].income_statement.net_income
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
            label: 'Equity growth',
            data: this.equityGrowthSeries(),
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#00f0b5'
          },
          {
            label: 'Earnings growth',
            data: this.netIncomeGrowthSeries(),
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#ff6663'
          },
          {
            label: 'Earnings per share growth',
            data: this.EPSGrowthSeries(),
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#5e239d'
          },
          {
            label: 'Revenue growth',
            data: this.revenueGrowthSeries(),
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#0b3954'
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

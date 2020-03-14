<template>
    <div>
        <line-chart
          :width="500"
          :height="500"
          :chart-data="chartData"
          :chart-options="chartOptions"
          :ref="chart"
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

    @Component({
      components: {
        LineChart
      }
    })
export default class GrowthPage extends Vue {
  chartOptions: object = {
    responsive: false,
    maintainAspectRatio: false
  }

  chartData = {
    labels: [],
    datasets: [{}]
  }

  get statements () {
    return this.$store.getters.getStatements
  }

  @Watch('statements', { deep: true })
  onStatementsChanged () {
    const growth = map(this.$store.getters.getStatements, (value: FinancialStatement, index: number, collection: FinancialStatement[]) => {
      if (index - 1 < 0) {
        return
      }

      const current = value.balance_sheet.equity
      const past = collection[index - 1].balance_sheet.equity

      return growthRate(current, past)
    }).filter(element => element !== undefined)

    this.chartData.datasets = [
      {
        label: 'Equity Growth',
        data: growth,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#861657'
      }
    ]

    const years = map(this.$store.getters.getStatements, (value: FinancialStatement, index: number) => {
      if (index - 1 < 0) {
        return
      }
      return parseInt(value.fiscal_end_date.split('-')[0], 10)
    }).filter(element => element !== undefined)

    this.$set(this.chartData, 'labels', years)
  }
}
</script>

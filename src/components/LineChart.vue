<script>

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object
    },
    chartOptions: {
      type: Object
    }
  },
  watch: {
    chartData: {
      handler: function () {
        this.$data._chart.update()
        this.renderChart(this.chartData, this.chartOptions)
      },
      deep: true
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>

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
        this.$data._chart.destroy()
        this.renderChart(this.chartData, this.chartOptions)
      },
      deep: true,
      immediate: false
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>

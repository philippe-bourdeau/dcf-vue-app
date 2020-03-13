<script>

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    this.renderChart(
      {
        labels: ['2010', '2011', '2012', '2013'],
        datasets: [
          {
            label: 'EPS Growth',
            data: [5, 9, 6, 10],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#c1d37f'
          },
          {
            label: 'Earnings Growth',
            data: [2, 7, 16, 9],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#861657'
          }
        ]
      },
      {
        responsive: false,
        maintainAspectRatio: false
      }
    )
  }
}
</script>

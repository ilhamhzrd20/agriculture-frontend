<script>
// Importing Line class from the vue-chartjs wrapper
import { Line } from 'vue-chartjs'

// Exporting this so it can be used in other components
export default {
  extends: Line,
  data() {
    return {
      datacollection: {
        // Data to be represented on x-axis
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Temperature (Celcius)',
            backgroundColor: '#EF6C00',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            data: [19, 25, 34, 18, 28, 10, 20, 36, 33, 21, 20, 30]
          }
        ]
      },
      // Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    // renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options)
  }
}
</script>

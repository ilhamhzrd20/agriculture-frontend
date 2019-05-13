<script>
import { Line } from 'vue-chartjs'
// import Zoom from 'chartjs-plugin-zoom'
// const { reactiveProp } = mixins
// Exporting this so it can be used in other components
export default {
  extends: Line,
  // mixins: [reactiveProp],
  // eslint-disable-next-line
  props: ['chartData', 'options'],
  watch: {
    chartData: function () {
      this.$data._chart.destroy()
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted() {
    // this.addPlugin(Zoom)
    this.renderChart(this.chartData, this.options)
  }
}
</script>

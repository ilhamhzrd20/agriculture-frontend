<script>
// Importing Line class from the vue-chartjs wrapper
import { Line } from 'vue-chartjs'

// Exporting this so it can be used in other components
export default {
  extends: Line,
  // eslint-disable-next-line
  props: ['data', 'options'],
  // watch: {
  //   data: function () {
  //     this._chart.destroy()
  //     this.renderChart(this.data, this.options)
  //   }
  // },
  mounted() {
    // renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.data, this.options)
  }
}
</script>

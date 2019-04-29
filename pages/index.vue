<template>
  <v-container fluid grid-list-md class="py-0">
    <v-layout>
      <v-flex xs12 sm12 md12 lg12>
        <h1 class="subheading grey--text">
          Dashboard
        </h1>
      </v-flex>
    </v-layout>
    <v-layout row class="mb-3">
      <v-flex xs12 sm6 md12 lg12 ma-1>
        <v-card
          class="mx-auto"
          color="white lighten-4"
          max-width="600"
        >
          <v-card-title>
            <v-icon
              :color="checking ? 'red lighten-2' : 'indigo'"
              @click="takePulse"
              class="mr-5"
              size="64"
            >
              mouse
            </v-icon>
            <v-layout
              column
              align-start
            >
              <div class="caption grey--text text-uppercase">
                Temperature
              </div>
              <div>
                <span
                  v-text="currentTemp || '—'"
                  class="display-2 font-weight-black"
                />
                <strong v-if="currentTemp">Celcius</strong>
              </div>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md12 lg12 ma-1>
        <v-card
          class="mx-auto"
          color="white lighten-4"
          max-width="600"
        >
          <v-card-title>
            <v-icon
              :color="checking ? 'red lighten-2' : 'indigo'"
              @click="takePulse"
              class="mr-5"
              size="64"
            >
              mouse
            </v-icon>
            <v-layout
              column
              align-start
            >
              <div class="caption grey--text text-uppercase">
                Soil Moisture
              </div>
              <div>
                <span
                  v-text="currentSoilMoisture || '—'"
                  class="display-2 font-weight-black"
                />
                <strong v-if="currentSoilMoisture">Percent</strong>
              </div>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md12 lg12 ma-1>
        <v-card
          class="mx-auto"
          color="white lighten-4"
          max-width="600"
        >
          <v-card-title>
            <v-icon
              :color="checking ? 'red lighten-2' : 'indigo'"
              @click="takePulse"
              class="mr-5"
              size="64"
            >
              mouse
            </v-icon>
            <v-layout
              column
              align-start
            >
              <div class="caption grey--text text-uppercase">
                Air Humidity
              </div>
              <div>
                <span
                  v-text="currentHumidity || '—'"
                  class="display-2 font-weight-black"
                />
                <strong v-if="currentHumidity">Percent</strong>
              </div>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <section class="container-chart ma-1">
      <v-card class="pa-3 mb-3">
        <h1>Water</h1>
        <div class="columns">
          <div class="column">
            <water-chart
              :data="dataCollectionWater"
              :options="options"
            />
          </div>
        </div>
      </v-card>

      <v-card class="pa-3 mb-3">
        <h1>Temperature</h1>
        <div class="columns mb-3">
          <div class="column">
            <temperature-chart
              :data="dataCollectionTemp"
              :options="options"
            />
          </div>
        </div>
      </v-card>

      <v-card class="pa-3">
        <h1>Humidity</h1>
        <div class="columns">
          <div class="column">
            <humidity-chart
              :data="dataCollectionSoilHumidity"
              :options="optionsStacked"
            />
          </div>
        </div>
      </v-card>
    </section>
  </v-container>
</template>

<script>
import WaterChart from '@/components/WaterChart'
import HumidityChart from '@/components/HumidityChart'
import TemperatureChart from '@/components/TemperatureChart'

const exhale = ms =>
  new Promise(resolve => setTimeout(resolve, ms))
export default {
  components: {
    'water-chart': WaterChart,
    'humidity-chart': HumidityChart,
    'temperature-chart': TemperatureChart
  },
  data() {
    return {
      checking: false,
      heartbeats: []
    }
  },

  computed: {
    avg() {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
      const length = this.heartbeats.length

      if (!sum && !length) return 0

      return Math.ceil(sum / length)
    },
    currentTemp() {
      return this.$store.getters.getDataCurrentsTemp
    },
    currentHumidity() {
      return this.$store.getters.getDataCurrentsHumidity
    },
    currentSoilMoisture() {
      return this.$store.getters.getDataCurrentsSoilMoisture
    },
    dataCollectionTemp() {
      // eslint-disable-next-line
      // console.log(this.$store.getters.getDataChartsTemp)
      return {
        // Data to be represented on x-axis
        labels: this.$store.getters.getDataChartsTime,
        datasets: [
          {
            label: 'Temperature (Celcius)',
            backgroundColor: '#1565C0',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            // data: [40.734, 20.23423, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
            data: this.$store.getters.getDataChartsTemp
          }
        ]
      }
    },
    dataCollectionWater() {
      // eslint-disable-next-line
      // console.log(this.$store.getters.getDataChartsTemp)
      return {
        // Data to be represented on x-axis
        labels: this.$store.getters.getDataChartsTime,
        datasets: [
          {
            label: 'Water Volume (Mili liter)',
            backgroundColor: '#1565C0',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            // data: [40.734, 20.23423, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
            data: this.$store.getters.getDataChartsWater
          }
        ]
      }
    },
    dataCollectionSoilHumidity() {
      // eslint-disable-next-line
      // console.log(this.$store.getters.getDataChartsTemp)
      return {
        // Data to be represented on x-axis
        labels: this.$store.getters.getDataChartsTime,
        datasets: [
          {
            label: 'Soil Moisture (%)',
            backgroundColor: '#F9A825',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            // data: [40.734, 20.23423, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
            data: this.$store.getters.getDataChartsSoil
          },
          {
            label: 'Air Humidity (%)',
            backgroundColor: '#283593',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            // data: [40.734, 20.23423, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
            data: this.$store.getters.getDataChartsHumidity
          }
        ]
      }
    },
    options() {
      return {
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
    },
    optionsStacked() {
      return {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            },
            stacked: true
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
  created() {
    this.takePulse(false)
  },
  mounted() {
    this.$store.dispatch('loadDataCurrentSensor')
    this.$store.dispatch('loadDataChart')
  },
  methods: {
    heartbeat() {
      return Math.ceil(Math.random() * (120 - 80) + 80)
    },
    async takePulse(inhale = true) {
      this.checking = true

      inhale && await exhale(1000)

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat)

      this.checking = false
    }
  }
}
</script>

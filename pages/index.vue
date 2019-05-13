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
        <water-chart
          :chartData="dataCollectionWater"
          :options="optionsWater"
        />
      </v-card>

      <v-card class="pa-3 mb-3">
        <h1>Temperature</h1>
        <temperature-chart
          :chartData="dataCollectionTemp"
          :options="optionsTemp"
        />
      </v-card>

      <v-card class="pa-3">
        <h1>Humidity</h1>
        <humidity-chart
          :chartData="dataCollectionSoilHumidity"
          :options="optionsStacked"
        />
      </v-card>
    </section>
  </v-container>
</template>

<script>
import io from 'socket.io-client'
import WaterChart from '@/components/WaterChart'
import HumidityChart from '@/components/HumidityChart'
import TemperatureChart from '@/components/TemperatureChart'

export default {
  components: {
    'water-chart': WaterChart,
    'humidity-chart': HumidityChart,
    'temperature-chart': TemperatureChart
  },
  middleware: 'auth',
  data() {
    return {
      gradient: null,
      gradient2: null,
      socket: io('http://192.168.43.36:8080')
    }
  },
  computed: {
    currentTemp() {
      return this.$store.getters.getDataCurrentsTemp
    },
    currentHumidity() {
      return this.$store.getters.getDataCurrentsHumidity
    },
    currentSoilMoisture() {
      return this.$store.getters.getDataCurrentsSoilMoisture
    },
    optionsWater() {
      return {
        scales: {
          yAxes: [{
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return value + ' ml'
              },
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
        maintainAspectRatio: false,
        // Container for zoom options
        zoom: {
          // Boolean to enable zooming
          enabled: true,

          // Zooming directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow zooming in the y direction
          mode: 'x'
        }
      }
    },
    optionsTemp() {
      return {
        scales: {
          yAxes: [{
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return value + ' °C'
              },
              beginAtZero: false
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
        maintainAspectRatio: false,
        // Container for zoom options
        zoom: {
          // Boolean to enable zooming
          enabled: true,

          // Zooming directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow zooming in the y direction
          mode: 'x'
        }
      }
    },
    optionsStacked() {
      return {
        scales: {
          yAxes: [{
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return value + ' %'
              },
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
        maintainAspectRatio: false,
        // Container for zoom options
        zoom: {
          // Boolean to enable zooming
          enabled: true,

          // Zooming directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow zooming in the y direction
          mode: 'x'
        }
      }
    },
    dataCollectionTemp() {
      // eslint-disable-next-line
      // console.log(this.$store.getters.getDataChartsTemp)
      return {
        // Data to be represented on x-axis
        labels: this.$store.getters.getDataChartsTime,
        datasets: [
          {
            label: 'Temperature',
            backgroundColor: '#d1792c',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
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
            label: 'Water Volume',
            backgroundColor: '#1565C0',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
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
            label: 'Soil Moisture',
            backgroundColor: '#22c1c3',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: this.$store.getters.getDataChartsSoil
          },
          {
            label: 'Air Humidity',
            backgroundColor: '#5ca991',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: this.$store.getters.getDataChartsHumidity
          }
        ]
      }
    }
  },
  mounted() {
    this.$store.dispatch('loadDataCurrentSensor')
    this.$store.dispatch('loadDataChart')
    setInterval(() => {
      this.$store.dispatch('loadDataCurrentSensor')
      this.$store.dispatch('loadDataChart')
    }, 60000)
    clearInterval(null)
  }
}
</script>

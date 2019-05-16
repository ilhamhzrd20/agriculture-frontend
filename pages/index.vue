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
              color="orange darken-2"
            >
              mdi-oil-temperature
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
              color="green darken-2"
            >
              mdi-sprout
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
              color="cyan darken-1"
            >
              mdi-water-percent
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
        <v-layout class="chart-wrapper">
          <water-chart
            :options="chartOptionsLineWater"
            autoresize
          />
        </v-layout>
      </v-card>

      <v-card class="pa-3 mb-3">
        <h1>Temperature</h1>
        <v-layout class="chart-wrapper">
          <temperature-chart
            :options="chartOptionsLineTemp"
            autoresize
          />
        </v-layout>
      </v-card>

      <v-card class="pa-3 mb-3">
        <h1>Soil Moisture</h1>
        <v-layout class="chart-wrapper">
          <soil-chart
            :options="chartOptionsLineSoil"
            autoresize
          />
        </v-layout>
      </v-card>

      <v-card class="pa-3">
        <h1>Air Humidity</h1>
        <v-layout class="chart-wrapper">
          <humidity-chart
            :options="chartOptionsLineHumidity"
            autoresize
          />
        </v-layout>
      </v-card>
    </section>
  </v-container>
</template>

<script>
import io from 'socket.io-client'
import Echarts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/markLine'

export default {
  components: {
    'water-chart': Echarts,
    'humidity-chart': Echarts,
    'temperature-chart': Echarts,
    'soil-chart': Echarts
  },
  extends: Echarts,
  middleware: 'auth',
  data() {
    return {
      temper: '',
      appInterval: 0,
      socket: io('http://192.168.43.36:8080')
    }
  },
  computed: {
    chartOptionsLineTemp() {
      return {
        title: {
          text: 'Statistic'
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.$store.getters.getDataChartsTime
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        visualMap: {
          top: 1,
          right: 1,
          pieces: [{
            gt: 0,
            lte: 20,
            color: '#096'
          }, {
            gt: 20,
            lte: 25,
            color: '#ffde33'
          }, {
            gt: 25,
            lte: 35,
            color: '#ff9933'
          }, {
            gt: 35,
            lte: 40,
            color: '#cc0033'
          }, {
            gt: 40,
            lte: 80,
            color: '#660099'
          }, {
            gt: 80,
            color: '#7e0023'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: 'Temperature',
          type: 'line',
          data: this.$store.getters.getDataChartsTemp,
          markLine: {
            silent: true,
            data: [{
              yAxis: 20
            }, {
              yAxis: 25
            }, {
              yAxis: 35
            }, {
              yAxis: 40
            }, {
              yAxis: 80
            }]
          },
          areaStyle: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(0, 205, 181)'
            }, {
              offset: 1,
              color: 'rgb(65, 88, 153)'
            }])
          }
        }
      }
    },
    chartOptionsLineWater() {
      return {
        title: {
          text: 'Statistic'
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.$store.getters.getDataChartsTime
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        visualMap: {
          top: 1,
          right: 1,
          pieces: [{
            gt: 0,
            lte: 100,
            color: '#096'
          }, {
            gt: 100,
            lte: 200,
            color: '#ffde33'
          }, {
            gt: 200,
            lte: 300,
            color: '#ff9933'
          }, {
            gt: 300,
            lte: 400,
            color: '#cc0033'
          }, {
            gt: 400,
            lte: 500,
            color: '#660099'
          }, {
            gt: 500,
            color: '#7e0023'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: 'Water',
          type: 'line',
          data: this.$store.getters.getDataChartsWater,
          markLine: {
            silent: true,
            data: [{
              yAxis: 100
            }, {
              yAxis: 200
            }, {
              yAxis: 300
            }, {
              yAxis: 400
            }, {
              yAxis: 500
            }]
          },
          areaStyle: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(0, 205, 181)'
            }, {
              offset: 1,
              color: 'rgb(65, 88, 153)'
            }])
          }
        }
      }
    },
    chartOptionsLineSoil() {
      return {
        title: {
          text: 'Statistic'
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.$store.getters.getDataChartsTime
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        visualMap: {
          top: 1,
          right: 1,
          pieces: [{
            gt: 0,
            lte: 25,
            color: '#096'
          }, {
            gt: 25,
            lte: 55,
            color: '#ffde33'
          }, {
            gt: 55,
            lte: 75,
            color: '#ff9933'
          }, {
            gt: 75,
            color: '#cc0033'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: 'Soil Moisture',
          type: 'line',
          data: this.$store.getters.getDataChartsSoil,
          markLine: {
            silent: true,
            data: [{
              yAxis: 25
            }, {
              yAxis: 55
            }, {
              yAxis: 75
            }]
          },
          areaStyle: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(0, 205, 181)'
            }, {
              offset: 1,
              color: 'rgb(65, 88, 153)'
            }])
          }
        }
      }
    },
    chartOptionsLineHumidity() {
      return {
        title: {
          text: 'Statistic'
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.$store.getters.getDataChartsTime
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        visualMap: {
          top: 1,
          right: 1,
          pieces: [{
            gt: 0,
            lte: 25,
            color: '#096'
          }, {
            gt: 25,
            lte: 55,
            color: '#ffde33'
          }, {
            gt: 55,
            lte: 75,
            color: '#ff9933'
          }, {
            gt: 75,
            color: '#cc0033'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: 'Air Humidity',
          type: 'line',
          data: this.$store.getters.getDataChartsHumidity,
          markLine: {
            silent: true,
            data: [{
              yAxis: 25
            }, {
              yAxis: 55
            }, {
              yAxis: 75
            }]
          },
          areaStyle: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(0, 205, 181)'
            }, {
              offset: 1,
              color: 'rgb(65, 88, 153)'
            }])
          }
        }
      }
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
    laoding() {
      return this.$store.getters.loading
    }
  },
  mounted() {
    this.socket.on('readSensor', function (response) {
      this.temper = response.data.temp
    })
    this.$store.dispatch('loadDataCurrentSensor')
    this.$store.dispatch('loadDataChart')
    if (this.$store.getters.getDataCurrentsTemp) {
      this.appInterval = setInterval(() => {
        this.$store.dispatch('loadDataCurrentSensor')
        this.$store.dispatch('loadDataChart')
      }, 60000)
    } else {
      clearInterval(this.appInterval)
    }
  }
}
</script>
<style scoped lang="css">
.chart-wrapper {
  width: 100%;
  height: 500px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <v-container fluid grid-list-md class="py-0 gray_light">
    <v-layout>
      <v-flex xs12 sm12 md12 lg12>
        <h1 class="subheading secondary--text">
          Dashboard
        </h1>
      </v-flex>
    </v-layout>
    <v-layout row class="mb-3">
      <v-flex xs12 sm6 md12 lg12 ma-1>
        <v-card
          class="mx-auto primary"
          max-width="600"
        >
          <v-card-title>
            <v-icon
              class="mr-5"
              size="64"
              color="secondary"
            >
              mdi-oil-temperature
            </v-icon>
            <v-layout
              column
              align-start
            >
              <div class="caption secondary--text text-uppercase font-weight-black">
                Temperature
              </div>
              <div>
                <span class="display-2 font-weight-black white--text">{{ temperature || currentTemp || '—' }}</span>
                <strong class="white--text">Celcius</strong>
              </div>
            </v-layout>
          </v-card-title>
          <v-btn icon class="align-self-start white--text" size="20">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
          <span class="headline font-weight-black white--text">{{ valueTemp || currentFuzzyTemp || '—' }}</span>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md12 lg12 ma-1>
        <v-card
          class="mx-auto primary"
          max-width="600"
        >
          <v-card-title>
            <v-icon
              class="mr-5"
              size="64"
              color="secondary"
            >
              mdi-sprout
            </v-icon>
            <v-layout
              column
              align-start
            >
              <div class="caption secondary--text text-uppercase font-weight-black">
                Soil Moisture
              </div>
              <div>
                <span class="display-2 font-weight-black white--text">{{ soil || currentSoilMoisture || '—' }}</span>
                <strong class="white--text">Percent</strong>
              </div>
            </v-layout>
          </v-card-title>
          <v-btn icon class="align-self-start white--text" size="20">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
          <span class="headline font-weight-black white--text">{{ valueSoil || currentFuzzySoil || '—' }}</span>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md12 lg12 ma-1>
        <v-card
          class="mx-auto primary"
          max-width="600"
        >
          <v-card-title>
            <v-icon
              class="mr-5"
              size="64"
              color="secondary"
            >
              mdi-water-percent
            </v-icon>
            <v-layout
              column
              align-start
            >
              <div class="caption secondary--text text-uppercase font-weight-black">
                Air Humidity
              </div>
              <div>
                <span class="display-2 font-weight-black white--text">{{ humidity || currentHumidity || '—' }}</span>
                <strong class="white--text">Percent</strong>
              </div>
            </v-layout>
          </v-card-title>
          <v-btn icon class="align-self-start white--text" size="20">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
          <span class="headline font-weight-black white--text">{{ valueHum || currentFuzzyHum || '—' }}</span>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md12 lg12 ma-1>
        <v-card
          class="mx-auto primary"
          max-width="600"
        >
          <v-card-title>
            <v-icon
              class="mr-5"
              size="64"
              color="secondary"
            >
              mdi-water-pump
            </v-icon>
            <v-layout
              column
              align-start
            >
              <div class="caption secondary--text text-uppercase font-weight-black">
                Water
              </div>
              <div>
                <span class="display-2 font-weight-black white--text">{{ water || currentWater || '—' }}</span>
                <strong class="white--text">Mili Liter</strong>
              </div>
            </v-layout>
          </v-card-title>
          <v-btn icon class="align-self-start white--text" size="20">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
          <span class="headline font-weight-black white--text">{{ valueWater || currentFuzzyWater || '—' }}</span>
        </v-card>
      </v-flex>
    </v-layout>

    <section class="container-chart ma-1">
      <v-card class="blue-grey lighten-5 pa-3 mb-3">
        <h1 class="secondary--text">
          Water
        </h1>
        <v-layout class="chart-wrapper">
          <water-chart
            :options="chartOptionsLineWater"
            autoresize
          />
        </v-layout>
      </v-card>

      <v-card class="blue-grey lighten-5 pa-3 mb-3">
        <h1 class="secondary--text">
          Temperature
        </h1>
        <v-layout class="chart-wrapper">
          <temperature-chart
            :options="chartOptionsLineTemp"
            autoresize
          />
        </v-layout>
      </v-card>

      <v-card class="blue-grey lighten-5 pa-3 mb-3">
        <h1 class="secondary--text">
          Soil Moisture
        </h1>
        <v-layout class="chart-wrapper">
          <soil-chart
            :options="chartOptionsLineSoil"
            autoresize
          />
        </v-layout>
      </v-card>

      <v-card class="blue-grey lighten-5 pa-3">
        <h1 class="secondary--text">
          Air Humidity
        </h1>
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
import CircularJSON from 'circular-json'
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
      temperature: 0,
      humidity: 0,
      soil: 0,
      water: 0,
      valueTemp: '',
      valueHum: '',
      valueSoil: '',
      valueWater: '',
      appInterval: 0,
      socket: io('http://168.63.232.214:8080')
    }
  },
  computed: {
    chartOptionsLineTemp() {
      return {
        title: {
          text: 'Statistic',
          textStyle: {
            color: '#415899'
          }
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
          axisLabel: {
            color: '#415899'
          },
          data: this.currentTime
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            color: '#415899'
          },
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
          textStyle: {
            color: '#415899'
          },
          handleStyle: {
            color: '#415899',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        visualMap: {
          top: 1,
          right: 1,
          textStyle: {
            color: '#415899'
          },
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
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
              offset: 0,
              color: 'rgb(0, 205, 181)'
            }, {
              offset: 1,
              color: 'rgb(76,98,158)'
            }])
          }
        }
      }
    },
    chartOptionsLineWater() {
      return {
        title: {
          text: 'Statistic',
          textStyle: {
            color: '#415899'
          }
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
          axisLabel: {
            color: '#415899'
          },
          data: this.currentTime
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            color: '#415899'
          },
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
          textStyle: {
            color: '#415899'
          },
          handleStyle: {
            color: '#415899',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        visualMap: {
          top: 1,
          right: 1,
          textStyle: {
            color: '#415899'
          },
          pieces: [{
            gt: 0,
            lte: 100,
            color: '#096'
          }, {
            gt: 150,
            lte: 200,
            color: '#ffde33'
          }, {
            gt: 125,
            lte: 250,
            color: '#ff9933'
          }, {
            gt: 187,
            lte: 312,
            color: '#FF6D00'
          }, {
            gt: 250,
            lte: 375,
            color: '#cc0033'
          }, {
            gt: 350,
            lte: 450,
            color: '#660099'
          }, {
            gt: 400,
            lte: 500,
            color: '#7e0023'
          }, {
            gt: 500,
            color: '#999'
          }],
          outOfRange: {
            color: '#3E2723'
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
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
              offset: 0,
              color: 'rgb(0, 205, 181)'
            }, {
              offset: 1,
              color: 'rgb(76,98,158)'
            }])
          }
        }
      }
    },
    chartOptionsLineSoil() {
      return {
        title: {
          text: 'Statistic',
          textStyle: {
            color: '#415899'
          }
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
          axisLabel: {
            color: '#415899'
          },
          data: this.currentTime
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            color: '#415899'
          },
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
          textStyle: {
            color: '#415899'
          },
          handleStyle: {
            color: '#415899',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        visualMap: {
          top: 1,
          right: 1,
          textStyle: {
            color: '#415899'
          },
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
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
              offset: 0,
              color: 'rgb(0, 205, 181)'
            }, {
              offset: 1,
              color: 'rgb(76,98,158)'
            }])
          }
        }
      }
    },
    chartOptionsLineHumidity() {
      return {
        title: {
          text: 'Statistic',
          textStyle: {
            color: '#415899'
          }
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
          axisLabel: {
            color: '#415899'
          },
          data: this.currentTime
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            color: '#415899'
          },
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
          textStyle: {
            color: '#415899'
          },
          handleStyle: {
            color: '#415899',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        visualMap: {
          top: 1,
          right: 1,
          textStyle: {
            color: '#415899'
          },
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
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
              offset: 0,
              color: 'rgb(0, 205, 181)'
            }, {
              offset: 1,
              color: 'rgb(76,98,158)'
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
    currentWater() {
      return this.$store.getters.getDataCurrentsWater
    },
    currentFuzzyTemp() {
      return this.$store.getters.getFuzzyTemp
    },
    currentFuzzyHum() {
      return this.$store.getters.getFuzzyHum
    },
    currentFuzzySoil() {
      return this.$store.getters.getFuzzySoil
    },
    currentFuzzyWater() {
      return this.$store.getters.getFuzzyWater
    },
    currentTime() {
      return this.$store.getters.getDataChartsTime
    }
  },
  mounted: function () {
    this.socket.on('readSensor', (datasensor) => {
      const status = CircularJSON.parse(datasensor)
      const temp = CircularJSON.stringify(status.temp)
      const hum = CircularJSON.stringify(status.humidity)
      const soil = CircularJSON.stringify(status.soilMoisture)
      const water = CircularJSON.stringify(status.waterVolume)
      const fuzzyTemp = CircularJSON.stringify(status.ruleFuzzyTemp)
      const fuzzyHum = CircularJSON.stringify(status.ruleFuzzyHum)
      const fuzzySoil = CircularJSON.stringify(status.ruleFuzzySoil)
      const fuzzyWater = CircularJSON.stringify(status.ruleFuzzyWater)
      // eslint-disable-next-line
      console.log('temp: ', temp);
      this.temperature = temp
      this.humidity = hum
      this.soil = soil
      this.water = water
      this.valueTemp = fuzzyTemp
      this.valueHum = fuzzyHum
      this.valueSoil = fuzzySoil
      this.valueWater = fuzzyWater
    })
    this.$store.dispatch('loadDataCurrentSensor')
    this.$store.dispatch('loadDataChart')
    if (this.$store.getters.getDataChartsTemp) {
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
.bg-color {
  background: rgb(65,88,153);
  background: -moz-linear-gradient(107deg, rgba(65,88,153,1) 0%, rgba(0,205,181,1) 100%);
  background: -webkit-linear-gradient(107deg, rgba(65,88,153,1) 0%, rgba(0,205,181,1) 100%);
  background: linear-gradient(107deg, rgba(65,88,153,1) 0%, rgba(0,205,181,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#415899",endColorstr="#00cdb5",GradientType=1);
}
</style>

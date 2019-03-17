<template>
  <v-layout>
    <div class="dashboard">
      <h1 class="subheading grey--text my-2">
        Dashboard
      </h1>
      <v-container fluid>
        <v-layout row class="mb-3">
          <v-flex lg4 sm6 xs12 ma-1>
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
                      v-text="avg || '—'"
                      class="display-2 font-weight-black"
                    />
                    <strong v-if="avg">Celcius</strong>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>

          <v-flex lg4 sm6 xs12 ma-1>
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
                      v-text="avg || '—'"
                      class="display-2 font-weight-black"
                    />
                    <strong v-if="avg">Persen</strong>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>

          <v-flex lg4 sm6 xs12 ma-1>
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
                      v-text="avg || '—'"
                      class="display-2 font-weight-black"
                    />
                    <strong v-if="avg">Persen</strong>
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
                <water-chart />
              </div>
            </div>
          </v-card>

          <v-card class="pa-3 mb-3">
            <h1>Temperature</h1>
            <div class="columns mb-3">
              <div class="column">
                <temperature-chart />
              </div>
            </div>
          </v-card>

          <v-card class="pa-3">
            <h1>Humidity</h1>
            <div class="columns">
              <div class="column">
                <humidity-chart />
              </div>
            </div>
          </v-card>
        </section>
      </v-container>
    </div>
  </v-layout>
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
    }
  },

  created() {
    this.takePulse(false)
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

<template>
  <v-container fluid grid-list-md class="py-0">
    <div class="historys">
      <v-layout class="px-0">
        <v-flex xs12 sm12 md12 lg12>
          <h1 class="subheading secondary--text">
            Riwayat
          </h1>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-card
            class="mx-auto px-1 pt-1"
            max-width="400"
          >
            <v-dialog
              ref="dialog"
              v-model="menu"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startDate"
                  v-on="on"
                  label="Tanggal Mulai"
                  prepend-icon="event"
                />
              </template>
              <v-date-picker v-model="startDate" scrollable>
                <v-spacer />
                <v-btn @click="menu = false" flat color="primary">
                  Tutup
                </v-btn>
                <v-btn @click="endClick" :loading="loading" flat color="primary">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4 mr-4>
          <v-card
            class="mx-auto px-1 pt-1"
            max-width="400"
          >
            <v-dialog
              ref="dialog"
              v-model="menu2"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="endDate"
                  v-on="on"
                  label="Tanggal Berakhir"
                  prepend-icon="event"
                />
              </template>
              <v-date-picker v-model="endDate" scrollable>
                <v-spacer />
                <v-btn @click="menu2 = false" flat color="primary">
                  Tutup
                </v-btn>
                <v-btn @click="endClick" :loading="loading" flat color="primary">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-card>
        </v-flex>
      </v-layout>
      <v-container fluid>
        <v-data-table
          :headers="headers"
          :items="historys"
          :loading="loading"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">
              {{ props.item.id }}
            </td>
            <td class="text-xs-center">
              {{ props.item.temp }}
            </td>
            <td class="text-xs-center">
              {{ props.item.soilMoisture }}
            </td>
            <td class="text-xs-center">
              {{ props.item.humidity }}
            </td>
            <td class="text-xs-center">
              {{ props.item.waterVolume }}
            </td>
            <td class="text-xs-center">
              {{ formatDate(props.item.createdAt) }}
            </td>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  middleware: 'auth',
  data() {
    return {
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      headers: [
        { text: 'No', align: 'center', value: 'id' },
        { text: 'Suhu (Celsius)', align: 'center', value: 'temperature' },
        { text: 'Kelembaban Tanah (%)', align: 'center', value: 'soilMoisture' },
        { text: 'Kelembaban Udara (%)', align: 'center', value: 'airHumidity' },
        { text: 'Volume Air (ml)', align: 'center', value: 'volume' },
        { text: 'Waktu', align: 'center', value: 'createdAt' }
      ]
    }
  },
  computed: {
    historys() {
      return this.$store.getters.getHistorys
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  mounted() {
    this.$store.dispatch('loadHistory', this.startDate + '.' + this.endDate)
  },
  methods: {
    endClick() {
      this.$store.dispatch('loadHistory', this.startDate + '.' + this.endDate)
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MMMM Do YYYY, h:mm:ss a')
      }
    }
  }
}
</script>
<style scoped lang="css">
.rounded-card{
    border-radius: 50px;
}
</style>

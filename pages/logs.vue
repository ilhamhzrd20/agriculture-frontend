<template>
  <v-container fluid grid-list-md class="py-0">
    <div class="historys">
      <v-layout>
        <v-flex xs12 sm12 md12 lg12>
          <h1 class="subheading grey--text">
            History Log
          </h1>
        </v-flex>
      </v-layout>
      <v-container fluid>
        <v-data-table
          :headers="headers"
          :items="historys"
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
              {{ props.item.time }}
            </td>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'No', align: 'center', value: 'id' },
        { text: 'Temperature (Celcius)', align: 'center', value: 'temperature' },
        { text: 'Soil Moisture (%)', align: 'center', value: 'soilMoisture' },
        { text: 'Air Humidity (%)', align: 'center', value: 'airHumidity' },
        { text: 'Volume (ml)', align: 'center', value: 'volume' },
        { text: 'CreateAt', align: 'center', value: 'createAt' }
      ]
    }
  },
  computed: {
    historys() {
      return this.$store.getters.getHistorys
    }
  },
  mounted() {
    this.$store.dispatch('loadHistory')
  }
}
</script>

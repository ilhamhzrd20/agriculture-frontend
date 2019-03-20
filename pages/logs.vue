<template>
  <v-layout>
    <div class="historys">
      <h1 class="subheading grey--text my-2">
        History Log
      </h1>
      <v-container fluid>
        <v-data-table
          :headers="headers"
          :items="historys"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
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
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Temperature (Celcius)', align: 'center', value: 'temperature' },
        { text: 'Soil Moisture (%)', align: 'center', value: 'soilMoisture' },
        { text: 'Air Humidity (%)', align: 'center', value: 'airHumidity' },
        { text: 'Volume (ml)', align: 'center', value: 'volume' },
        { text: 'CreateAt', align: 'center', value: 'createAt' }
      ]
      // historys: [
      //   {
      //     temperature: 29.5,
      //     soilMoisture: 60,
      //     airHumidity: 50,
      //     volume: 100,
      //     createAt: '2019-02-06 14:40:30'
      //   },
      //   {
      //     temperature: 22.5,
      //     soilMoisture: 60,
      //     airHumidity: 50,
      //     volume: 100,
      //     createAt: '2019-02-06 14:40:30'
      //   },
      //   {
      //     temperature: 24.5,
      //     soilMoisture: 60,
      //     airHumidity: 50,
      //     volume: 100,
      //     createAt: '2019-02-06 14:40:30'
      //   },
      //   {
      //     temperature: 21.5,
      //     soilMoisture: 60,
      //     airHumidity: 50,
      //     volume: 100,
      //     createAt: '2019-02-06 14:40:30'
      //   },
      //   {
      //     temperature: 29.5,
      //     soilMoisture: 60,
      //     airHumidity: 50,
      //     volume: 100,
      //     createAt: '2019-02-06 14:40:30'
      //   },
      //   {
      //     temperature: 23.5,
      //     soilMoisture: 60,
      //     airHumidity: 50,
      //     volume: 100,
      //     createAt: '2019-02-06 14:40:30'
      //   },
      //   {
      //     temperature: 24.5,
      //     soilMoisture: 60,
      //     airHumidity: 50,
      //     volume: 100,
      //     createAt: '2019-02-06 14:40:30'
      //   },
      //   {
      //     temperature: 38.5,
      //     soilMoisture: 60,
      //     airHumidity: 50,
      //     volume: 100,
      //     createAt: '2019-02-06 14:40:30'
      //   },
      //   {
      //     temperature: 18.5,
      //     soilMoisture: 60,
      //     airHumidity: 50,
      //     volume: 100,
      //     createAt: '2019-02-06 14:40:30'
      //   },
      //   {
      //     temperature: 58.5,
      //     soilMoisture: 60,
      //     airHumidity: 50,
      //     volume: 100,
      //     createAt: '2019-02-06 14:40:30'
      //   }
      // ]
    }
  },
  computed: {
    historys() {
      this.$store.dispatch('loadHistory')
      return this.$store.getters.getHistorys
    }
  }
}
</script>

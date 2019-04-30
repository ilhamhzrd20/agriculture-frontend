import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      loadHistorys: [],
      loadDataCurrents: [],
      loadDataCharts: []
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload
      },
      setHistorys(state, payload) {
        state.loadHistorys = payload
      },
      setDataCurrents(state, payload) {
        state.loadDataCurrents = payload
      },
      setDataCharts(state, payload) {
        state.loadDataCharts = payload
      }
    },
    actions: {
      nuxtServerInit({ commit, state }) {
        this.$axios.get('http://192.168.43.36:8080/data/index/item')
          .then((res) => {
            // eslint-disable-next-line
            const historyArray = []
            for (let key in res.data) {
              historyArray.push({ ...res.data[key++], id: key })
            }
            commit('setHistorys', historyArray)
          }).catch()

        this.$axios.get('http://192.168.43.36:8080/data/average/all')
          .then((res) => {
            // eslint-disable-next-line no-console
            // console.log(res)
            state.loadDataCharts = null
            for (const key in res.data) {
              state.loadDataCharts.push({ ...res.data[key], id: key })
            }
          }).catch()
      },
      login({ commit }, payload) {
        this.$axios.post('http://localhost:8080/users/login', payload).then((res) => {
          // eslint-disable-next-line
          console.log(res.data)
          commit('setUser', res.data)
        }).catch()
      },
      loadHistory({ commit }) {
        this.$axios.get('http://192.168.43.36:8080/data/index/item')
          .then((res) => {
          // eslint-disable-next-line
          const history = []
            for (let key in res.data) {
              history.push({ ...res.data[key++], id: key })
            }
            commit('setHistorys', history)
          }).catch()
      },
      loadDataCurrentSensor({ commit }) {
        this.$axios.get('http://192.168.43.36:8080/data/index/item')
          .then((res) => {
            const dataCurrent = res.data[0]
            commit('setDataCurrents', dataCurrent)
            // eslint-disable-next-line no-console
            // console.log(dataCurrentTemp)
          }).catch()
      },
      loadDataChart({ commit }) {
        this.$axios.get('http://192.168.43.36:8080/data/average/all')
          .then((res) => {
          // eslint-disable-next-line
          const chart = []
            for (const key in res.data) {
              chart.push({ ...res.data[key], id: key })
            }
            commit('setDataCharts', chart)
          }).catch()
      }
    },
    getters: {
      getUser(state) {
        return state.user
      },
      getHistorys(state) {
        return state.loadHistorys
      },
      getDataCurrentsTemp(state) {
        return state.loadDataCurrents.temp
      },
      getDataCurrentsHumidity(state) {
        return state.loadDataCurrents.humidity
      },
      getDataCurrentsSoilMoisture(state) {
        return state.loadDataCurrents.soilMoisture
      },
      getDataChartsTemp(state) {
        const array = []
        for (let i = 0; i < state.loadDataCharts.length; i++) {
          for (let j = 0; j < 20; j++) {
            array.push(state.loadDataCharts[j].avgTemp)
          }
          return array
        }
      },
      getDataChartsWater(state) {
        const array = []
        for (let i = 0; i < state.loadDataCharts.length; i++) {
          for (let j = 0; j < 20; j++) {
            array.push(state.loadDataCharts[j].avgWater)
          }
          return array
        }
      },
      getDataChartsSoil(state) {
        const array = []
        for (let i = 0; i < state.loadDataCharts.length; i++) {
          for (let j = 0; j < 20; j++) {
            array.push(state.loadDataCharts[j].avgSoilMoisture)
          }
          return array
        }
      },
      getDataChartsHumidity(state) {
        const array = []
        for (let i = 0; i < state.loadDataCharts.length; i++) {
          for (let j = 0; j < 20; j++) {
            array.push(state.loadDataCharts[j].avgHumidity)
          }
          return array
        }
      },
      getDataChartsTime(state) {
        const array = []
        for (let i = 0; i < state.loadDataCharts.length; i++) {
          for (let j = 0; j < 20; j++) {
            array.push(state.loadDataCharts[j]._id)
          }
          return array
        }
      }
    }
  })
}

export default createStore

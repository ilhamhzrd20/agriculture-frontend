import Vuex from 'vuex'
const Cookie = require('js-cookie')
const cookieparser = require('cookieparser')
const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      loading: false,
      error: null,
      isLogin: false,
      loadHistorys: [],
      loadDataCurrents: [],
      loadDataCharts: []
    },
    mutations: {
      setLoading(state, payload) {
        state.loading = payload
      },
      setError(state, payload) {
        state.error = payload
      },
      clearError(state) {
        state.error = null
      },
      setUser(state, payload) {
        state.user = payload
      },
      setIsLogin(state, payload) {
        state.isLogin = payload
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
      nuxtServerInit({ commit, state }, { req }) {
        let user = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            user = JSON.parse(parsed.user)
            commit('setUser', user)
          } catch (err) {
            // eslint-disable-next-line
            console.log(err)
          }
        }
      },
      login({ commit }, payload) {
        commit('setLoading', true)
        commit('clearError')
        this.$axios.post(process.env.webServiceUrl + 'users/login', payload)
          .then((res) => {
            commit('setLoading', false)

            if (!res.data.status) {
              commit('setError', res.data.message)
            }
            // eslint-disable-next-line
            console.log(res.data.user)
            const accessToken = res.data.user
            const expired = 1
            Cookie.set('user', accessToken, { expires: expired })
            commit('setUser', accessToken)
            commit('setIsLogin', true)
          }).catch((error) => {
            commit('setLoading', false)
            commit('setError', error)
            // eslint-disable-next-line
            console.log(error)
          })
      },
      loadHistory({ commit }, payload) {
        this.$axios.get(process.env.webServiceUrl + 'data/index/item/' + payload)
          .then((res) => {
          // eslint-disable-next-line
          const history = []
            for (let key in res.data) {
              history.push({ ...res.data[key++], id: key })
            }
            commit('setHistorys', history)
          }).catch((err) => {
            // eslint-disable-next-line
            console.log(err)
          })
      },
      loadDataCurrentSensor({ commit }) {
        this.$axios.get(process.env.webServiceUrl + 'data/index/item')
          .then((res) => {
            const dataCurrent = res.data[0]
            commit('setDataCurrents', dataCurrent)
            // eslint-disable-next-line no-console
            // console.log(dataCurrentTemp)
          }).catch((err) => {
            // eslint-disable-next-line
            console.log(err)
          })
      },
      loadDataChart({ commit }) {
        commit('setLoading', true)
        this.$axios.get(process.env.webServiceUrl + 'data/average/all')
          .then((res) => {
            commit('setLoading', false)
            // eslint-disable-next-line
          const chart = []
            for (const key in res.data) {
              chart.push({ ...res.data[key], id: key })
            }
            commit('setDataCharts', chart)
          }).catch((err) => {
            commit('setLoading', false)
            // eslint-disable-next-line
            console.log(err)
          })
      },
      logoutUser({ commit }) {
        Cookie.remove('user')
        commit('setIsLogin', false)
        commit('setUser', null)
        // eslint-disable-next-line
        console.log("logout accessed")
      },
      clearError({ commit }) {
        commit('clearError')
      }
    },
    getters: {
      getUser(state) {
        return state.user
      },
      getIsLogin(state) {
        return state.isLogin
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
      },
      error(state) {
        return state.error
      },
      loading(state) {
        return state.loading
      }
    }
  })
}

export default createStore

import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      historys: []
    },
    mutations: {
      setHistorys(state, payload) {
        state.historys = payload
      }
    },
    actions: {
      nuxtServerInit({ commit }) {
        this.$axios.get('http://192.168.43.36:8080/data/index/all').then((res) => {
        // eslint-disable-next-line
        const history = []
          for (const key in res.data) {
            history.push({ ...res.data[key] })
          }
          commit('setHistorys', history)
        }).catch()
      },
      login({ commit }, payload) {
        this.$axios.post('http://localhost:8080/users/login', payload).then((res) => {
          // eslint-disable-next-line
          console.log(res)
        }).catch()
      },
      initialize({ commit }, payload) {
        this.$axios.get('http://localhost:8080/users/index/all', payload).then((res) => {
          // eslint-disable-next-line
          // console.log(res)
          return res.data
        }).catch()
      },
      loadHistory({ commit }) {
        this.$axios.get('http://192.168.43.36:8080/data/index/all').then((res) => {
        // eslint-disable-next-line
        const history = []
          for (const key in res.data) {
            history.push({ ...res.data[key] })
          }
          commit('setHistorys', history)
        }).catch()
      }
    },
    getters: {
      getHistorys(state) {
        return state.historys
      }
    }
  })
}

export default createStore

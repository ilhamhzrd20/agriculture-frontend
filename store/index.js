import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    mutations: {

    },
    actions: {
      login({ commit }, payload) {
        this.$axios.post('http://localhost:8080/users/login', payload).then((res) => {
          // eslint-disable-next-line
          console.log(res)
        }).catch()
      },
      initialize({ commit }, payload) {
        this.$axios.get('http://localhost:8080/users/index/all', payload).then((res) => {
          // eslint-disable-next-line
          console.log(res)
        }).catch()
      }
    },
    getters: {

    }
  })
}

export default createStore

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({

  strict: true,

  state: {
    isLoading: false,
    config: null,
    hostnames: [],
    raspberries: []
  },

  getters: {

    isLoading: state => {
      return state.isLoading
    },

    config: state => {
      return state.config
    },

    hostnames: state => {
      return state.hostnames
    },

    raspberries: state => {
      return state.raspberries
    }
  },

  mutations: {

    setConfig (state, config) {
      state.config = config
    },

    setHostnames (state, hostnames) {
      state.hostnames = hostnames
    },

    resetRaspberries (state) {
      state.raspberries = []
    },

    addRaspberry (state, payload) {
      state.raspberries[payload.index] = payload.raspberry
    },

    addHostname (state, hostname) {
      state.hostnames.push(hostname)
    },

    removeHostname (state, hostname) {
      const index = state.hostnames.indexOf(hostname)

      if (index !== -1) {
        state.hostnames.splice(index, 1)
      }
    },

    isLoading (state, isLoading) {
      state.isLoading = isLoading
    }
  },

  actions: {

    loadConfig ({commit}) {
      commit('setConfig', require('./../config/config.json'))
    },

    loadHostnames ({commit}) {
      commit('setHostnames', JSON.parse(localStorage.getItem('hostnames')))
    },

    loadRapsberries ({getters, commit, dispatch}) {
      // If the number of raspberries match the number of hosts
      // we do not need to do anything since everything is already loaded
      if (getters.hostnames.length === getters.raspberries.length) {
        return
      }

      dispatch('startLoading')
      commit('resetRaspberries')

      getters.hostnames.forEach((hostname, index) => {
        if (getters.config.use_fixtures === true) {
          // Use Fake-Data if Fixtures are enabled
          commit('addRaspberry', {
            raspberry: require('./../config/fixture.json'),
            index: index
          })
        } else {
          // Otherwise perform a real http call
          axios.get(hostname).then((response) => {
            commit('addRaspberry', {
              raspberry: response.data,
              index: index
            })
          })
        }
      })

      dispatch('stopLoading')
    },

    removeHostname ({getters, commit, dispatch}, hostname) {
      commit('removeHostname', hostname)
      dispatch('loadRapsberries')
    },

    addHostname ({getters, commit, dispatch}, hostname) {
      commit('addHostname', hostname)
      dispatch('loadRapsberries')
    },

    startLoading ({commit}) {
      commit('isLoading', true)
    },

    stopLoading ({commit}) {
      setTimeout(() => {
        commit('isLoading', false)
      }, 700)
    }
  }
})

store.subscribe((mutation, state) => {
  // Save to localStorage if a hostname has been added
  if (mutation.type === 'addHostname') {
    localStorage.setItem('hostnames', JSON.stringify(state.hostnames))
  }

  // Save to localStorage if a hostname has been added
  if (mutation.type === 'removeHostname') {
    localStorage.setItem('hostnames', JSON.stringify(state.hostnames))
  }
})

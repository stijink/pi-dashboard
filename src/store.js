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
      if (hostnames !== null) {
        state.hostnames = hostnames
      }
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
      dispatch('startLoading')

      getters.hostnames.forEach((hostname, index) => {
        if (getters.config.use_fixtures === true) {
          dispatch('_loadRaspberryFixture', { hostname: hostname, index: index })
        } else {
          dispatch('_loadRaspberryHttp', { hostname: hostname, index: index })
        }
      })

      dispatch('stopLoading')
    },

    // Only called internally by loadRapsberries
    _loadRaspberryFixture ({commit}, payload) {
      commit('addRaspberry', {
        raspberry: require('./../config/fixture.json'),
        index: payload.index
      })
    },

    // Only called internally by loadRapsberries
    _loadRaspberryHttp ({getters, commit}, payload) {
      const url = getters.config.server.protocol +
      '://' + payload.hostname + ':' +
      getters.config.server.port

      axios.get(url).then((response) => {
        commit('addRaspberry', {
          raspberry: response.data,
          index: payload.index
        })
      })
      .catch(() => {
        commit('addRaspberry', {
          raspberry: {
            hostname: payload.hostname,
            is_online: false
          },
          index: payload.index
        })
      })
    },

    removeHostname ({getters, commit, dispatch}, hostname) {
      commit('removeHostname', hostname)
      commit('resetRaspberries')
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

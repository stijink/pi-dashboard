import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import OnlineRaspberry from './components/OnlineRaspberry'
import OfflineRaspberry from './components/OfflineRaspberry'
import AddRaspberry from './components/AddRaspberry'
import RemoveRaspberry from './components/RemoveRaspberry'

import { store } from './store'

Vue.component('raspberry-online', OnlineRaspberry)
Vue.component('raspberry-offline', OfflineRaspberry)
Vue.component('add-raspberry', AddRaspberry)
Vue.component('remove-raspberry', RemoveRaspberry)

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),

  created () {
    this.$store.dispatch('loadConfig')
    this.$store.dispatch('loadHostnames')
  }
})

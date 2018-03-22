import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import Raspberry from './components/Raspberry'
import AddRaspberry from './components/AddRaspberry'

import { store } from './store'

Vue.component('raspberry', Raspberry)
Vue.component('add-raspberry', AddRaspberry)

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

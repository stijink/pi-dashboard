import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.css'

import App from './App'
/* import router from './router' */

import Raspberry from './components/Raspberry'
Vue.component('raspberry', Raspberry)

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

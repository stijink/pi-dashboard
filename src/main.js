import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import Raspberry from './components/Raspberry'
import AddRaspberry from './components/AddRaspberry'

Vue.component('raspberry', Raspberry)
Vue.component('add-raspberry', AddRaspberry)

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

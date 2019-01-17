import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

const ajax = Axios.create({
  baseURL: 'http://localhost:30001/api',
})
Vue.prototype.$http = ajax
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

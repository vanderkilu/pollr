import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { formatDate } from './helpers'


Vue.config.productionTip = false
Vue.filter('cleanDate', (value)=> {
  return formatDate(value)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

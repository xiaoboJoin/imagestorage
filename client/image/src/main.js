import Vue from 'vue'
import App from './App'
var VueResource = require('vue-resource')
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

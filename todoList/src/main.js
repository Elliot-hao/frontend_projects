import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#App')

new Vue({
  el: '#App',
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
})
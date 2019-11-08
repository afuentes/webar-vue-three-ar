import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.config.ignoredElements = [
  'a-scene',
  'a-entity',
  'a-camera',
  'a-box',
  'a-marker',
  'a-anchor',
  'a-camera-static'
]

new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from '../vue/app.vue'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

const init = () => {
  var app = new Vue({
    el: '#app',
    render: (h) => h(App),
  })
}

window.onload = init
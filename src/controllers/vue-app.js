import Vue from 'vue'
import App from '../vue/app.vue'
import store from '../vue/store'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

const init = () => {
  var app = new Vue({
    el: '#app',
    store,
    render: (h) => h(App),
  })
}

window.onload = init
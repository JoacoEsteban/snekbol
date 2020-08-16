import Vue from 'vue'
import App from '@/vue/app.vue'
import store from '../vue/store'


declare module 'vue/types/vue' {
  interface Vue {
    $sleep: (time?: number) => Promise<void>
  }
}


// Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.prototype.$sleep = (time:number) => new Promise(resolve => setTimeout(resolve, time))

const init = () => {
  var app = new Vue({
    el: '#app',
    store,
    render: (h) => h(App),
  })
}

window.onload = init
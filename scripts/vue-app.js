var app = new Vue({
  el: '#app',
  data: {
    snakeName: '',
    hideModal: false
  },
  methods: {
    imready() {
      imready()
    },
    async connect() {
      try {
        let success = await login(this.snakeName)
        this.hideModal = true
      } catch (error) {
        throw error
      }
    },
  },
  computed: {
    isConnected() {
      return onlineInstance !== null
    }
  }
})
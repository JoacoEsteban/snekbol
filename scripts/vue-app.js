var app = new Vue({
  el: '#app',
  data: {
    snakeName: '',
    hideModal: false,
    isConnected: false,
    isMobile: window.isMobile,
    swipeContainerElement: null
  },
  created() {
    if (this.isMobile || true) {
      let element = document.getElementById('swipe-container')
      this.swipeContainerElement = element
      let hammertime = new Hammer.Manager(element)
      let swipe = new Hammer.Swipe()
      hammertime.add([swipe])
      hammertime.on('swipe', function ({ angle }) {
        let direction
        if (angle < 45 && angle > -45) {
          direction = 'ArrowRight'
        } else if (angle < 135 && angle > 45) {
          direction = 'ArrowDown'
        } else if ((angle < 180 && angle > 135) || (angle > -180 && angle < -135)) {
          direction = 'ArrowLeft'
        } else if (angle > -135 && angle < -45) {
          direction = 'ArrowUp'
        }
        console.log(angle, direction)
        inputHandling(direction)
      })

    }
  },
  watch: {
    isConnected(val) {
      if (val) this.swipeContainerElement.classList.add('show')
      else this.swipeContainerElement.classList.remove('show')
    }
  },
  methods: {
    async imready() {
      this.isConnected = await imready() === true
    },
    async connect() {
      try {
        await login(this.snakeName)
        this.hideModal = true
      } catch (error) {
        throw error
      }
    },
  }
})
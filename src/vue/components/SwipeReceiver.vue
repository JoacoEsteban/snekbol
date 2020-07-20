<template>
<div>
  <div v-if="isMobile" :class="{show: isIngame}" ref="swipe-container" class="swipe-container fix-full"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      HAMMERTIME: null,
      isMobile: window.isMobile,
      allowedDirections: ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']
    } 
  },
  computed: {
    onlineInstance () {
      return this.$store.state.ONLINE_INSTANCE && this.$store.state.ONLINE_INSTANCE.game
    },
    isPlaying () {
      return this.onlineInstance && this.onlineInstance.flags.started
    },
    isIngame () {
      return !!this.onlineInstance
    },
  },
  created() {
    this.setHammer()
    $(window).on('keydown', this.onKeyDown)
  },
  methods: {
    onKeyDown ({key}) {
      if (!this.isIngame) return
      this.inputHandling(key)
    },
    setHammer() {
      if (!this.isMobile) return
      this.HAMMERTIME = new Hammer.Manager((this.swipeContainerElement = this.$refs['#swipe-container']))
      const swipe = new Hammer.Swipe()
      this.HAMMERTIME.add([swipe])
      this.HAMMERTIME.on('swipe', this.onSwipe)
    },
    onSwipe ({ angle }) {
        let direction
        if (angle < 45 && angle > -45) {
          direction = 'ArrowRight'
        } else if (angle < 135 && angle > 45) {
          direction = 'ArrowDown'
        } else if (
          (angle < 180 && angle > 135) ||
          (angle > -180 && angle < -135)
        ) {
          direction = 'ArrowLeft'
        } else if (angle > -135 && angle < -45) {
          direction = 'ArrowUp'
        }
        console.log(angle, direction)
        this.inputHandling(direction, true)
      },
    inputHandling(key, force) {
      if (!force && !this.allowedDirections.includes(key)) return
      let nextDirection = 0
      switch (key) {
        case 'ArrowUp':
            nextDirection = 0
            break
        case 'ArrowRight':
            nextDirection = 1
            break
        case 'ArrowDown':
            nextDirection = 2
            break
        case 'ArrowLeft':
            nextDirection = 3
            break
      }
      CONNECTION.sendDirection(nextDirection)
    }
  }
};
</script>


<style lang="scss" scoped>
.swipe-container {
  &:not(.show) {
    pointer-events: none;
    background-color: #ff11;
  }
}
</style>
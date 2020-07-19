<template>
<div>
  <div v-if="isMobile" :class="{show: isConnected}" ref="swipe-container" class="swipe-container fix-full"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      HAMMERTIME: null,
      isMobile: window.isMobile
    } 
  },
  computed: {
    isConnected () {
      return this.$store.state.IS_CONNECTED
    }
  },
  created() {
    this.setHammer()
  },
  methods: {
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
        // inputHandling(direction)
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
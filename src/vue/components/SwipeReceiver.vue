<template>
  <div>
    <div v-if="isMobile" :class="{show}" ref="swipe-container" class="swipe-container fix-full"></div>
  </div>
</template>

<script lang="ts">
let $ = window.$
const Hammer = window.Hammer
import { Component, Vue } from 'vue-property-decorator';
import { OnlineInstance, Nullable, AllowedDirections } from '@/typings/index'

const _data: {
  swipeContainerElement: Nullable<Vue | Element | Vue[] | Element[] | EventTarget>;
} = {
  swipeContainerElement: null
}

@Component
export default class SwipeReciever extends Vue {
  HAMMERTIME: Nullable<HammerManager> = null
  isMobile = window.IS_MOBILE


  get onlineInstance (): OnlineInstance {
    return this.$store.state.ONLINE_INSTANCE && this.$store.state.ONLINE_INSTANCE.game
  }
  get isPlaying (): boolean {
    return !!(this.onlineInstance && this.onlineInstance.flags.started)
  }
  get isIngame (): boolean {
    return !!this.onlineInstance
  }
  get show (): boolean {
    return this.isPlaying
  }


  mounted() {
    $ = window.$
    this.setHammer()
    ;($ || window.$)(window).on('keydown', this.onKeyDown)
  }


  onKeyDown (event: JQueryEventObject) {
    if (!this.isIngame) return
    const direction = this.getDirectionFromEvent(event)
    if (direction === null) return
    this.inputHandling(direction)
  }
  getDirectionFromEvent (e: JQueryEventObject): Nullable<AllowedDirections> {
    switch (e.keyCode) {
      case 37: return AllowedDirections.left
      case 38: return AllowedDirections.up
      case 39: return AllowedDirections.right
      case 40: return AllowedDirections.down
      default: return null
    }
  }
  setHammer() {
    if (!this.isMobile) return
    _data.swipeContainerElement = this.$refs['swipe-container']
    if (_data.swipeContainerElement instanceof EventTarget) {
      this.HAMMERTIME = new Hammer.Manager(_data.swipeContainerElement)
      const swipe = new Hammer.Swipe()
      this.HAMMERTIME.add([swipe])
      this.HAMMERTIME.on('swipe', this.onSwipe)
    }
  }
  onSwipe (event: { angle: number }) {
    const angle = event.angle
    let direction: Nullable<AllowedDirections> = null

    if (angle < 45 && angle > -45) {
      direction = AllowedDirections.right
    } else if (angle < 135 && angle > 45) {
      direction = AllowedDirections.down
    } else if ( (angle < 180 && angle > 135) || (angle > -180 && angle < -135) ) {
      direction = AllowedDirections.left
    } else if (angle > -135 && angle < -45) {
      direction = AllowedDirections.right
    }
    if (!direction) return

    this.inputHandling(direction)
  }
  inputHandling(key: AllowedDirections): void {
    window.CONNECTION.sendDirection(key)
  }
}

</script>


<style lang="scss" scoped>
.swipe-container {
  &:not(.show) {
    pointer-events: none;
    background-color: #ff11;
  }
}
</style>
<template>
<div>
  <div v-if="isMobile" :class="{show}" ref="swipe-container" class="swipe-container fix-full"></div>
</div>
</template>

<script lang="ts">
import { OnlineInstance, Nullable, AllowedDirections } from '../../../typings/types';

const _data: {
  swipeContainerElement: Nullable<Vue | Element | Vue[] | Element[] | EventTarget>
} = {
  swipeContainerElement: null
}

export default {
  data() {
    const data: {
      HAMMERTIME: Nullable<HammerManager>
      isMobile: boolean
    } = {
      HAMMERTIME: null,
      isMobile: window.IS_MOBILE,
    } 
    return data
  },
  computed: {
    onlineInstance ():OnlineInstance {
      return this.$store.state.ONLINE_INSTANCE && this.$store.state.ONLINE_INSTANCE.game
    },
    isPlaying ():boolean {
      return !!(this.onlineInstance && this.onlineInstance.flags.started)
    },
    isIngame ():boolean {
      return !!this.onlineInstance
    },
    show ():boolean {
      return this.isPlaying
    }
  },
  mounted() {
    this.setHammer()
    $(window).on('keydown', this.onKeyDown)
  },
  methods: {
    onKeyDown (event:JQueryEventObject) {
      if (!this.isIngame) return
      const direction = this.getDirectionFromEvent(event)
      if (!direction) return
      this.inputHandling(direction)
    },
    getDirectionFromEvent (e: JQueryEventObject):Nullable<AllowedDirections> {
      switch (e.keyCode) {
        case 37: return AllowedDirections.left
        case 38: return AllowedDirections.up
        case 37: return AllowedDirections.right
        case 40: return AllowedDirections.down
        default: return null
      }
    },
    setHammer() {
      if (!this.isMobile) return
      console.log(this.$refs['swipe-container'])
      _data.swipeContainerElement = this.$refs['swipe-container']
      if (_data.swipeContainerElement instanceof EventTarget) {
        this.HAMMERTIME = new Hammer.Manager(_data.swipeContainerElement)
        const swipe = new Hammer.Swipe()
        this.HAMMERTIME.add([swipe])
        this.HAMMERTIME.on('swipe', this.onSwipe)
      }
    },
    onSwipe (event:{ angle:number }) {
      const angle = event.angle
      let direction:Nullable<AllowedDirections> = null

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

      console.log(angle, direction)
      this.inputHandling(direction)
    },
    inputHandling(key:AllowedDirections):void {
      window.CONNECTION.sendDirection(key)
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
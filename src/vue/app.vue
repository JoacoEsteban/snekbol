<template>
  <div>
    <login-modal @submit="connect" :hide="hideModal"/>
    <div v-if="!isConnected" @click="imready" class="button-std">I'm Ready</div>

    <div :class="{show: isConnected}" id="swipe-container"></div>
    <div class="app-container">
        <div class="game-container">
            <div id="counter"></div>
            <div id="main-grid"></div>
        </div>
    </div>

  </div>
</template>

<script>
import LoginModal from './components/login-modal.vue'
export default {
  components: {
    LoginModal
  },
  data() {
    return {
      snakeName: '',
      hideModal: false,
      isConnected: false,
      isMobile: window.isMobile,
      swipeContainerElement: null
    } 
  },
  created() {
    if (this.isMobile) {
      let element = document.getElementById('swipe-container');
      this.swipeContainerElement = element;
      let hammertime = new Hammer.Manager(element);
      let swipe = new Hammer.Swipe();
      hammertime.add([swipe]);
      hammertime.on('swipe', function({ angle }) {
        let direction;
        if (angle < 45 && angle > -45) {
          direction = 'ArrowRight';
        } else if (angle < 135 && angle > 45) {
          direction = 'ArrowDown';
        } else if (
          (angle < 180 && angle > 135) ||
          (angle > -180 && angle < -135)
        ) {
          direction = 'ArrowLeft';
        } else if (angle > -135 && angle < -45) {
          direction = 'ArrowUp';
        }
        console.log(angle, direction);
        inputHandling(direction);
      });
    }
  },
  methods: {
    async imready() {
      try {
        this.isConnected = (await CONNECTION.imready()) === true;
      } catch (error) {
        console.error('error', error)
      }
    },
    async connect(name) {
      try {
        await CONNECTION.login(name);
        this.hideModal = true;
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
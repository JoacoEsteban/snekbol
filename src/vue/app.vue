<template>
  <div>
    <LoginModal @submit="connect" />
    <div v-if="!isConnected" @click="imready" class="button-std">I'm Ready</div>

    <div id="swipe-container"></div>
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
      snakeName: "",
      hideModal: true,
      isConnected: false,
      isMobile: window.isMobile,
      swipeContainerElement: null
    } 
  },
  created() {
    this.hideModal = true;
    if (this.isMobile || true) {
      let element = document.getElementById("swipe-container");
      this.swipeContainerElement = element;
      let hammertime = new Hammer.Manager(element);
      let swipe = new Hammer.Swipe();
      hammertime.add([swipe]);
      hammertime.on("swipe", function({ angle }) {
        let direction;
        if (angle < 45 && angle > -45) {
          direction = "ArrowRight";
        } else if (angle < 135 && angle > 45) {
          direction = "ArrowDown";
        } else if (
          (angle < 180 && angle > 135) ||
          (angle > -180 && angle < -135)
        ) {
          direction = "ArrowLeft";
        } else if (angle > -135 && angle < -45) {
          direction = "ArrowUp";
        }
        console.log(angle, direction);
        inputHandling(direction);
      });
    }
  },
  watch: {
    isConnected(val) {
      if (val) this.swipeContainerElement.classList.add("show");
      else this.swipeContainerElement.classList.remove("show");
    }
  },
  methods: {
    async imready() {
      this.isConnected = (await imready()) === true;
    },
    async connect() {
      try {
        await login(this.snakeName);
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
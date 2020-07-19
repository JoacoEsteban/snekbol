<template>
  <div>
    <login-modal @submit="connect" :hide="hideModal"/>
    <button v-if="!isConnected" @click="imready">I'm Ready</button>
    <game-canvas></game-canvas>
  </div>
</template>

<script>
import LoginModal from './components/LoginModal.vue'
import GameCanvas from './components/GameCanvas.vue'
export default {
  components: {
    LoginModal,
    GameCanvas
  },
  data() {
    return {
      snakeName: '',
      hideModal: false,
      isMobile: window.isMobile,
      swipeContainerElement: null,
    } 
  },
  computed: {
    isConnected () {
      return this.$store.state.IS_CONNECTED
    }
  },
  beforeCreate () {
    window.ROOT = this.$root
    window.APP = this
  },
  methods: {
    async imready() {
      try {
        this.$store.commit('CONNECTION_CHANGE', (await CONNECTION.imready()) === true)
      } catch (error) {
        console.error('error', error)
      }
    },
    async connect(name) {
      try {
        await CONNECTION.login(name)
        this.hideModal = true
      } catch (error) {
        throw error
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
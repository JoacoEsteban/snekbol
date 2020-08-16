<template>
  <div>
    <login-modal @submit="connect" :hide="hideModal"/>
    <button v-if="showImReadyBtn" @click="imready">I'm Ready</button>
    <game-canvas></game-canvas>
  </div>
</template>

<script lang="ts">
import LoginModal from './components/LoginModal.vue'
import GameCanvas from './components/GameCanvas.vue'
export default {
  components: {
    LoginModal,
    GameCanvas
  },
  data() {
    return {
      hideModal: false,
      isMobile: window.IS_MOBILE,
      swipeContainerElement: null,
      CONNECTION: window.CONNECTION
    } 
  },
  computed: {
    isConnected (): boolean {
      return this.$store.state.IS_CONNECTED
    },
    onlineInstance () {
      return this.$store.state.ONLINE_INSTANCE && this.$store.state.ONLINE_INSTANCE.game
    },
    isPlaying (): boolean {
      return this.onlineInstance && this.onlineInstance.flags.started && !this.onlineInstance.flags.ended
    },
    isIngame (): boolean {
      return !!this.onlineInstance
    },
    showImReadyBtn (): boolean {
      return this.isIngame && !this.isPlaying
    }
  },
  beforeCreate ():void {
  },
  methods: {
    async imready() {
      try {
        this.$store.commit('CONNECTION_CHANGE', (await this.CONNECTION.imready()) === true)
      } catch (error) {
        console.error('error', error)
      }
    },
    async connect(name: string) {
      try {
        await this.CONNECTION.login(name)
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
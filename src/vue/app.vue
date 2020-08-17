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
import { OnlineInstance } from '@@types'
import { Component, Vue } from 'vue-property-decorator';


@Component({
  components: {
    LoginModal,
    GameCanvas
  },
})
export default class App extends Vue {
  hideModal = false
  isMobile = window.IS_MOBILE
  swipeContainerElement = null
  CONNECTION = window.CONNECTION

  get isConnected (): boolean {
    return this.$store.state.IS_CONNECTED
  }
  get onlineInstance (): OnlineInstance {
    return this.$store.state.ONLINE_INSTANCE && this.$store.state.ONLINE_INSTANCE.game
  }
  get isPlaying (): boolean {
    return this.onlineInstance && this.onlineInstance.flags.started && !this.onlineInstance.flags.ended
  }
  get isIngame (): boolean {
    return !!this.onlineInstance
  }
  get showImReadyBtn (): boolean {
    return this.isIngame && !this.isPlaying
  } 

  async imready() {
    try {
      this.$store.commit('CONNECTION_CHANGE', (await this.CONNECTION.imready()) === true)
    } catch (error) {
      console.error('error', error)
    }
  }
  async connect(name: string) {
    await this.CONNECTION.login(name)
    this.hideModal = true
  }

}
</script>


<style lang="scss" scoped>
</style>
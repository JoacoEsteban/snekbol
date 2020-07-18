<template>
  <div>
    <div :class="{hide: hideModal}" class="modal">
      <div class="whole-container">
        <span class="name">
          My snake is called
          <input @keyup.enter="connect" type="text" v-model="snakeName" class="snakename" />
        </span>
        <div class="button-std" @click="connect">Connect</div>
      </div>
      <div id="game-over" class="game-over">Game Over</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snakeName: "",
      hideModal: false,
    }
  },
  methods: {
    async imready() {
      this.isConnected = (await imready()) === true;
    },
    async connect() {
      this.$emit('submit')
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
<template>
  <div>
    <div :class="{hide}" class="modal">
      <div class="whole-container">
        <span class="name">
          My snake is called
          <input @keyup.enter="submit" type="text" v-model="snakeName" class="snakename" />
        </span>
        <button @click="submit">Connect</button>
      </div>
      <div id="game-over" class="game-over">Game Over</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hide: Boolean,
  },
  data() {
    return {
      snakeName: 'Snekbol'
    }
  },
  methods: {
    async submit() {
      this.$emit('submit', this.snakeName)
    }
  }
};
</script>


<style lang="scss" scoped>
</style>